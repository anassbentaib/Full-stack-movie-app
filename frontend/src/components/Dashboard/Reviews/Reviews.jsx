import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Divider,
  Stack,
  useDisclosure,
  Image,
  Link,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import Modal from "../../../ui/modals/Modal";
import { icon } from "../../../assets";
import Actors from "../MovieDetails/Avatar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMovieData, getMovieById } from "../../../features/moviesSlice";
import { clearReviewsData } from "../../../features/reviewSlice";
import { PuffLoader } from "react-spinners";
import { getReviews } from "../../../action/reviews";
import { useUser } from "../../../action/user";
import EmptyState from "../../../ui/EmptyState";

const Reviews = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.reviews);
  const { movie, isLoading } = useSelector((state) => state.movies);
  const user = useUser();
  useEffect(() => {
    dispatch(getMovieById(id));
    return () => {
      dispatch(clearMovieData());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (movie?.id) {
      dispatch(getReviews(movie?.id));
      return () => {
        dispatch(clearReviewsData());
      };
    }
  }, [dispatch, movie?.id]);

  return (
    <>
      <Modal movie={movie} isOpen={isOpen} onClose={onClose} action="Post" />
      <Box maxW="8xl" mx="auto" minH="100vh" pos="relative">
        <Box maxW="8xl" mx="auto" minH="100vh" pos="relative" py={5}>
          {isLoading ? (
            <div className="h-[70vh] flex flex-col items-center  justify-center">
              <PuffLoader size={70} color="red" />
            </div>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacing={5}>
              <Box>
                <Stack position="relative" mx="auto" cursor="pointer">
                  <Link href={`/movies/${movie?.title}/${movie?.id}`}>
                    <Image
                      border="3px solid #ffffff17"
                      borderRadius="5px"
                      mx="auto"
                      objectFit="cover"
                      w={{ base: "100%", sm: "400px" }}
                      h={{ base: "100%", sm: "550px" }}
                      src={movie?.poster}
                      alt={movie?.title}
                    />
                  </Link>
                  {user.user ? (
                    <Button
                      colorScheme="transparent"
                      onClick={onOpen}
                      mr={1}
                      leftIcon={<Image src={icon} w="18px" h="18px" />}
                      w={{ base: "100%", sm: "200px" }}
                      h={{ base: "40px", sm: "40px" }}
                      cursor="pointer"
                      border="1px solid #ccc"
                      borderRadius="20"
                      mx="auto"
                      fontSize="clamp(0.7rem, 0.9vw, 0.9rem)"
                    >
                      Write a review
                    </Button>
                  ) : (
                    <Text
                      textAlign="center"
                      color="#fff"
                      fontSize="clamp(0.8rem, 1vw,1rem)"
                    >
                      Log in to create your own review
                    </Text>
                  )}
                </Stack>
              </Box>
              <Box border="1px solid #ccc" maxW="3xl" p={4} borderRadius="5px">
                <Box maxW="3xl">
                  {review?.length ? (
                    <Box>
                      {review?.map((revie, index) => (
                        <Box key={revie.id}>
                          <Actors
                            key={index}
                            name={revie?.username}
                            role={moment(revie?.createdAt).fromNow()}
                            width="50px"
                            height="50px"
                          />
                          <Text color="#ccc" ml="20px">
                            {revie?.reviewBody}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <EmptyState
                      color="#fff"
                      title="No reviews found"
                      subtitle="Try to create your own review."
                    />
                  )}
                </Box>
              </Box>
            </SimpleGrid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Reviews;
