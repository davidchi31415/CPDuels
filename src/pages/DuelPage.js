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
} from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import TimeAndJoinDisplay from "../components/timeAndJoinDisplay";
import ScoreDisplay from "../components/scoreDisplay";
import Database, { handleUID } from "../data";
import socket from "../socket";
import { useParams, useNavigate } from "react-router-dom";
import TabContainer from "../components/duelContent/tabContainer.js";
import { MathJax } from 'better-react-mathjax';

const DuelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duelStatus, setDuelStatus] = useState("");
  const [playerNum, setPlayerNum] = useState();
  const [renderedMathJax, setRenderedMathJax] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const getDuelInfo = async () => {
      const duel = await Database.getDuelById(id);
      if (duelStatus !== duel.status) setDuelStatus(duel.status);
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
    return () => {
      socket.off("connect");
      socket.off("error-message");
      socket.off("status-change");
      socket.off("time-left");
    };
  }, []);

  useEffect(() => {
    if (duelStatus === "FINISHED") onOpen();
  }, [duelStatus]);

  return (
    <MathJax>
      {console.count('counter')}
      <BaseLayout
        content={
          <Box>
            <Flex justify="space-between" align="flex-start">
              <TabContainer
                id={id}
                duelStatus={duelStatus}
                playerNum={playerNum}
                onMathJaxRendered={() => setRenderedMathJax(true)}
              />
              <VStack spacing={5}>
                <TimeAndJoinDisplay
                  id={id}
                  duelStatus={duelStatus}
                  playerNum={playerNum}
                />
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
