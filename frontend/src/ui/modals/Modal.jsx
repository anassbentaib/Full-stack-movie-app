import React, { useState } from "react";
import Actors from "../../components/Dashboard/MovieDetails/Avatar";
import {
  FormControl,
  Textarea,
  ModalOverlay,
  Modal,
  Box,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useUser } from "../../action/user";
import { toast } from "react-hot-toast";
import { createReview, getReviews } from "../../action/reviews";
import EmptyState from "../EmptyState";

const modal = ({ isOpen, action, onClose, movie }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [data, setData] = useState({ reviewBody: "" });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setData("");
  };
  // if (!user?.user) {
  //   return (
  //     <EmptyState
  //       title="Unautheticated"
  //       subtitle="Please login to see the reviews"
  //     />
  //   );
  // }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { reviewBody } = data;
      if (user && user?.username) {
        const resultAction = await dispatch(
          createReview({ id: movie?.id, reviewBody, username: user?.username })
        );
        if (createReview.fulfilled.match(resultAction)) {
          await dispatch(getReviews(movie.id));

          toast.success("Review created.");
          onClose();
          resetForm();
        } else {
          console.error("Error creating review:", resultAction?.error);
          toast.error("Error creating review:", resultAction?.error);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error creating review:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#5b3a84">
          <form onSubmit={onSubmit}>
            <ModalBody pb={6}>
              <Box display="flex" justifyContent="start">
                <Actors
                  name={user?.username}
                  role="Posting publicly"
                  width="40px"
                  height="40px"
                />
              </Box>
              <FormControl mt={4}>
                <Textarea
                  name="reviewBody"
                  value={data.reviewBody}
                  onChange={handleChange}
                  borderColor="#802865"
                  _placeholder={{ color: "#c6b4d6" }}
                  color="#ccc"
                  focusBorderColor="#ffffff17"
                  placeholder="Share details of your own experience with this movie"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} padding="0.3rem 2rem" borderRadius="20">
                cancle
              </Button>

              <Button
                type="submit"
                color="#fff"
                bg="#802865"
                _hover={{ bg: "#802865" }}
                padding="0.3rem 2.3rem"
                borderRadius="20"
                ml={3}
              >
                {action}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default modal;
