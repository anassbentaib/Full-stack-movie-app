import React, { useCallback, useState } from "react";
import {
  Popover,
  Text,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../../ui/modals/AlertModal";
import { toast } from "react-hot-toast";
import { deleteMovie } from "../../api";

const DropDownMenu = ({ movie }) => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const [deletingId, setDeletingId] = useState("");

  const onConfirm = async () => {
    try {
      setLoading(true);
      await deleteMovie(movie.id);
      toast.success("Movie deleted");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      onClose();
      setLoading(false);
    }
  };
  const onDelete = useCallback(() => {
    setDeletingId(movie.id);

    deleteMovie(movie.id)
      .then(() => {
        toast.success("movie deleted");
        onClose();
        // router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  }, [router]);
  return (
    <>
      <AlertModal
        action="Continue"
        title="Are you sure?"
        description="This action cannot be undone."
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        onOpen={onOpen}
        disabled={deletingId === movie.id}
        onConfirm={onDelete}
      />
      <Menu>
        <MenuButton variant="ghost" size="sm">
          <FiMoreHorizontal fontSize="19px" fontWeight="bold" />
        </MenuButton>
        <MenuList bg="#5b3a84" border="none">
          <MenuItem
            bg="#5b3a84"
            onClick={() => router(`/admin-dashboard/${movie.id}`)}
          >
            <EditIcon w="16px" h="16px" mr={10} />
            Update
          </MenuItem>
          <MenuItem
            bg="#5b3a84"
            onClick={() => {
              onOpen();
            }}
          >
            <DeleteIcon w="16px" h="16px" mr={10} />
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropDownMenu;
