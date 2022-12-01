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
  Spinner,
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
  const [players, setPlayers] = useState([]);
  const [playerNum, setPlayerNum] = useState();
  const [submissionsRefresh, setSubmissionsRefresh] = useState(true);
  const [submissionsToast, setSubmissionsToast] = useState(false);
  const [scoresRefresh, setScoresRefresh] = useState(true);
  const [problemsRefresh, setProblemsRefresh] = useState(true);
  const [mathJaxRendered, setMathJaxRendered] = useState(false);
  const [replacingProblems, setReplacingProblems] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDuelInfo = async () => {
      const duel = await Database.getDuelById(id);
      if (!duel || duel?.message) navigate("/noduel");
      setLoading(false);
      if (duelStatus !== duel.status) setDuelStatus(duel.status);
      console.log(duel.platform);
      if (duelPlatform !== duel.platform) setDuelPlatform(duel.platform);
      setPlayers(duel.players);
      handleUID();
      let uid = localStorage.getItem("uid");
      if (uid === duel.players[0].uid) {
        if (playerNum !== 1) setPlayerNum(1);
      } else if (duel.players[1] && uid === duel.players[1].uid) {
        if (playerNum !== 2) setPlayerNum(2);
      }
      if (duel.regeneratingProblems) setReplacingProblems(true);
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
        setLoading(true);
        getDuelInfo();
      }
    });
    socket.on("abort-duel-error", ({ roomId, uid, message }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (roomId === id && uid === localUid) {
        makeToast({
          title: "Error",
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
          title: "Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
    socket.on("problem-change", ({ roomId }) => {
      if (roomId === id) {
        setProblemsRefresh(true);
        setScoresRefresh(true);
        setMathJaxRendered(false);
      }
    });
    socket.on("submission-change", ({ duelId }) => {
      if (duelId === id) {
        setSubmissionsRefresh(true);
        setSubmissionsToast(true);
        setProblemsRefresh(true);
        setScoresRefresh(true);
      }
    });
    socket.on("regenerate-problems-received", ({ roomId }) => {
      if (roomId === id) {
        setReplacingProblems(true);
      }
    });
    socket.on("regenerate-problems-completed", ({ roomId }) => {
      if (roomId === id) {
        setReplacingProblems(false);
        setProblemsRefresh(true);
        setMathJaxRendered(false);
        if (playerNum)
          makeToast({
            title: "Problems regenerated.",
            description: "Please see the new problem set.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
      }
    });
    return () => {
      socket.off("connect");
      socket.off("error-message");
      socket.off("status-change");
      socket.off("abort-duel-error");
      socket.off("resign-duel-error");
      socket.off("submission-change");
      socket.on("regenerate-problems-received");
      socket.on("regenerate-problems-completed");
    };
  }, []);

  useEffect(() => {
    if (duelStatus === "FINISHED") onOpen();
  }, [duelStatus]);

  // const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // useEffect(() => {
  //   const rerender = async () => {
  //     await sleep(5000);
  //   }
  //   if (problemsRefresh === false) {
  //     console.log("Rerendering");
  //     rerender();
  //     setRerenderVal((i) => i + 1); // Force rerender upon problem render to make sure MathJax shows properly
  //   }
  // }, [problemsRefresh]);

  return (
    <MathJax>
      {console.count("counter")}
      <BaseLayout
        content={
          <Box>
            {loading ? (
              <Flex
                position="absolute"
                top={0}
                left={0}
                justify="center"
                width="100%"
                height="100%"
                textAlign="center"
                background="rgb(0, 0, 0, 0.6)"
                zIndex={10}
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  mt="50vh"
                  emptyColor="grey.300"
                  color="#43ff43"
                  size="xl"
                />
              </Flex>
            ) : (
              ""
            )}
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
                players={players}
                playerNum={playerNum}
                problemsRefresh={problemsRefresh}
                onProblemsRefresh={() => setProblemsRefresh(false)}
                submissionsRefresh={submissionsRefresh}
                onSubmissionsRefresh={() => setSubmissionsRefresh(false)}
                submissionsToast={submissionsToast}
                onSubmissionsToast={() => setSubmissionsToast(false)}
                mathJaxRendered={mathJaxRendered}
                onMathJaxRendered={() => setMathJaxRendered(true)}
                replacingProblems={replacingProblems}
                setReplacingProblems={setReplacingProblems}
              />
              <VStack spacing={2}>
                <TimeAndJoinDisplay
                  id={id}
                  duelStatus={duelStatus}
                  players={players}
                  playerNum={playerNum}
                  replacing={replacingProblems}
                />
                {playerNum &&
                duelStatus !== "FINISHED" &&
                duelStatus !== "ABORTED" ? (
                  <AbortAndResignDisplay
                    id={id}
                    duelStatus={duelStatus}
                    players={players}
                    playerNum={playerNum}
                  />
                ) : (
                  ""
                )}
                <ScoreDisplay
                  id={id}
                  duelStatus={duelStatus}
                  players={players}
                  playerNum={playerNum}
                  refresh={scoresRefresh}
                  onRefresh={() => setScoresRefresh(false)}
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
