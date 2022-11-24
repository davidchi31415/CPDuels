import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  VStack,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import TimeAndJoinDisplay from "../components/timeAndJoinDisplay";
import ScoreDisplay from "../components/scoreDisplay";
import Database, { handleUID } from "../data";
import socket from "../socket";
import { useParams, useNavigate } from "react-router-dom";
import TabContainer from "../components/duelContent/tabContainer.js";
import { MathJax } from "better-react-mathjax";
import AbortAndResignDisplay from "../components/abortAndResignDisplay";

const DuelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duelPlatform, setDuelPlatform] = useState("CF");
  const [duelStatus, setDuelStatus] = useState("");
  const [playerNum, setPlayerNum] = useState();
  const [renderedMathJax, setRenderedMathJax] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }

  const forceUpdate = useForceUpdate();

  const toast = useToast();
  const toastRef = useRef();

  const makeToast = (toastParams) => {
    if (toastRef.current) {
      toast.close(toastRef.current);
      toastRef.current = toast(toastParams);
    } else {
      toastRef.current = toast(toastParams);
    }
  };

  useEffect(() => {
    const getDuelInfo = async () => {
      const duel = await Database.getDuelById(id);
      if (duelStatus !== duel.status) setDuelStatus(duel.status);
      console.log(duel.platform);
      if (duelPlatform !== duel.platform) setDuelPlatform(duel.platform);
      handleUID();
      let uid = localStorage.getItem("uid");
      if (uid === duel.players[0].uid) {
        if (playerNum !== 1) setPlayerNum(1);
      } else if (duel.players[1] && uid === duel.players[1].uid) {
        if (playerNum !== 2) setPlayerNum(2);
      }
    };
    getDuelInfo();
    socket.on("connect", async () => {
      socket.emit("join", { roomId: id });
    });
    socket.on("error-message", (message) => {
      alert(message);
    });
    socket.on("status-change", ({ roomId, newStatus }) => {
      console.log(roomId);
      if (roomId === id) {
        console.log("status changed to " + newStatus);
        getDuelInfo();
        forceUpdate();
      }
    });
    socket.on("time-left", ({ roomId, timeLeft }) => {
      if (roomId === id) {
        getDuelInfo();
      }
    });
    socket.on("abort-duel-error", ({ roomId, uid, message }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (roomId === id && uid === localUid) {
        makeToast({
          title: "Abort Duel Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
    socket.on("resign-duel-error", ({ roomId, uid, message }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (roomId === id && uid === localUid) {
        makeToast({
          title: "Resign Duel Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
    return () => {
      socket.off("connect");
      socket.off("error-message");
      socket.off("status-change");
      socket.off("time-left");
      socket.off("abort-duel-error");
      socket.off("resign-duel-error");
    };
  }, []);

  useEffect(() => {
    if (duelStatus === "FINISHED") onOpen();
  }, [duelStatus]);

  return (
    <MathJax>
      {console.count("counter")}
      <BaseLayout
        content={
          <Box>
            <Flex
              justify="space-between"
              align="flex-start"
              transform={[null, null, "scale(0.65)", "scale(0.85)", "none"]}
              ml={[null, null, "-8.5em", "-3.5em", 0]}
              mt={[null, null, "-8.25em", "-3.25em", 0]}
              gap={[null, null, 2, null, null]}
            >
              <TabContainer
                id={id}
                duelPlatform={duelPlatform}
                duelStatus={duelStatus}
                playerNum={playerNum}
                onMathJaxRendered={() => setRenderedMathJax(true)}
              />
              <VStack spacing={2}>
                <TimeAndJoinDisplay
                  id={id}
                  duelStatus={duelStatus}
                  playerNum={playerNum}
                />
                {playerNum &&
                duelStatus !== "FINISHED" &&
                duelStatus !== "ABORTED" ? (
                  <AbortAndResignDisplay id={id} duelStatus={duelStatus} />
                ) : (
                  ""
                )}
                <ScoreDisplay
                  id={id}
                  duelStatus={duelStatus}
                  playerNum={playerNum}
                />
              </VStack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size="sm">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Duel Is Over</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p>You can view the results now.</p>
                </ModalBody>
                <ModalFooter justifyContent="center">
                  <Button colorScheme="primary" mr={3} onClick={onClose}>
                    Ok
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        }
      />
    </MathJax>
  );
};

export default DuelPage;
