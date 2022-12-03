import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { handleUID } from "../../../data";
import socket from "../../../socket";

const AbortButton = ({ onOpen, cancelled, onCancelled }) => {
  const [aborting, setAborting] = useState(false);
  const handleAbort = (e) => {
    e.preventDefault();
    setAborting(true);
    onOpen();
  };

  useEffect(() => {
    if (cancelled) {
      setAborting(false);
      onCancelled();
    }
  }, [cancelled]);

  return (
    <Button
      rounded="md"
      colorScheme="red"
      isLoading={aborting}
      loadingText="Aborting"
      onClick={handleAbort}
      width="fit-content"
    >
      Abort Duel
    </Button>
  );
};

const ResignButton = ({ onOpen, cancelled, onCancelled }) => {
  const [resigning, setResigning] = useState(false);
  const handleResign = (e) => {
    e.preventDefault();
    setResigning(true);
    onOpen();
  };

  useEffect(() => {
    if (cancelled) {
      setResigning(false);
      onCancelled();
    }
  }, [cancelled]);

  return (
    <Button
      rounded="md"
      colorScheme="red"
      isLoading={resigning}
      loadingText="Resigning"
      onClick={handleResign}
      width="fit-content"
    >
      Resign
    </Button>
  );
};

const AbortAndResignDisplay = ({ id, duelStatus }) => {
  const abortModalContent = {
    title: "Abort?",
    message: "Are you sure you'd like to abort the duel?",
    action: "ABORT",
  };
  const resignModalContent = {
    title: "Resign?",
    message: "Are you sure you'd like to resign the duel?",
    action: "RESIGN",
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState(abortModalContent);

  const openModal = (type) => {
    if (type === "ABORT") {
      setModalContent(abortModalContent);
    } else {
      setModalContent(resignModalContent);
    }
    onOpen();
  };

  const handleAbortOrResign = (action) => {
    handleUID();
    let uid = localStorage.getItem("uid");
    if (action === "ABORT") {
      socket.emit("abort-duel", { roomId: id, uid: uid });
    } else {
      socket.emit("resign-duel", { roomId: id, uid: uid });
    }
    onClose();
  };

  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);
    onClose();
  };

  return (
    <Flex
      rounded="md"
      border="solid 1px"
      borderColor="grey.100"
      py={2}
      width="100%"
      height="fit-content"
      justifyContent="center"
    >
      {duelStatus === "ONGOING" ? (
        <ResignButton
          onOpen={() => openModal("RESIGN")}
          cancelled={cancelled}
          onCancelled={() => setCancelled(false)}
        />
      ) : (
        <AbortButton
          onOpen={() => openModal("ABORT")}
          cancelled={cancelled}
          onCancelled={() => setCancelled(false)}
        />
      )}
      <Modal isOpen={isOpen} onClose={handleCancel} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{modalContent.message}</p>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="primary"
              mr={3}
              onClick={() => handleAbortOrResign(modalContent.action)}
            >
              I'm sure
            </Button>
            <Button
              colorScheme="primary"
              variant="outline"
              mr={3}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AbortAndResignDisplay;
