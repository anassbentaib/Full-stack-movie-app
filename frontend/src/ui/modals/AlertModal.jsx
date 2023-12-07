import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const AlertModal = ({
  title,
  description,
  onConfirm,
  action,
  disabled,
  isOpen,
  loading,
  onClose,
}) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        >
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button padding="0.3rem 2rem" borderRadius="20" onClick={onClose}>
                Cancle
              </Button>
              <Button
                onClick={onConfirm}
                color="#fff"
                bg="#802865"
                _hover={{ bg: "#802865" }}
                padding="0.3rem 2rem"
                borderRadius="20"
                ml={ 2}
                disabled={disabled}
              >
                {action}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default AlertModal;
