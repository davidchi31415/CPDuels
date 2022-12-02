import React, { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionProps,
  Box,
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useDisclosure,
  ButtonGroup,
  IconButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import SubmitCodeEditor from "../submitCodeEditor";
import socket from "../../socket";
import Database, { handleUID } from "../../data";
import "./cfStyles.css";
import { RepeatIcon } from "@chakra-ui/icons";
import { MathJax } from "better-react-mathjax";

const AccordionContainer = ({
  id,
  duelPlatform,
  duelStatus,
  playerNum,
  refresh,
  onRefresh,
  mathJaxRendered,
  onMathJaxRendered,
  replacing,
  setReplacing,
}) => {
  const [problems, setProblems] = useState([]);
  const [problemVerdicts, setProblemVerdicts] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState();
  const [selectedReplaceProblemIndices, setSelectedReplaceProblemIndices] =
    useState([]); // Initialized duel

  useEffect(() => {
    const getProblemVerdicts = async () => {
      let duel = await Database.getDuelById(id);
      let newProblemVerdicts = [...Array(duel.problems.length).fill([null])];
      let playerIndex = playerNum - 1;
      for (let i = 0; i < duel.problems.length; i++) {
        if (duel.problems[i].playerSolveTimes[playerIndex])
          newProblemVerdicts[i] = "AC";
        else if (duel.problems[i].playerAttempts[playerIndex])
          newProblemVerdicts[i] = "WA";
      }
      setProblemVerdicts(newProblemVerdicts);
    };
    const getProblems = async () => {
      let duel = await Database.getDuelById(id);
      setProblems(duel.problems);
    };
    getProblems();
    if (refresh) {
      getProblemVerdicts();
      getProblems();
      onRefresh();
    }
  }, [refresh, playerNum, id]);

  useEffect(() => {
    if (!mathJaxRendered && document.querySelector(".MathJaxEnd")) {
      onMathJaxRendered();
    }
  });

  const defaultBorderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const rightAnswerColor = useColorModeValue("#b2eda7", "#21aa21");
  const wrongAnswerColor = useColorModeValue("red.500", "#b00");
  const selectedRowColor = useColorModeValue("primary.300", "primary.700");
  const rightAnswerSelectedColor = useColorModeValue("#d4edc9", "#238523");
  const wrongAnswerSelectedColor = useColorModeValue("#ff7575", "#c00");
  const sampleTestLineColor = useColorModeValue("grey.100", "grey.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedReplaceColor = useColorModeValue("red.500", "red.300");
  const numberColor = useColorModeValue("grey.900", "offWhite");

  const handleReplace = (e) => {
    e.preventDefault();
    socket.emit("regenerate-problems", {
      roomId: id,
      problemIndices: selectedReplaceProblemIndices,
    });
    setSelectedReplaceProblemIndices([]);
  };

  useEffect(() => {
    socket.on("replace-problem-received", ({ roomId, uid, updatedIndices }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (roomId === id && uid !== localUid) {
        setSelectedReplaceProblemIndices(updatedIndices);
      }
    });
    return () => {
      socket.off("replace-problem-received");
    };
  }, [id]);

  useEffect(() => {
    setSelectedReplaceProblemIndices([]);
    if (replacing && problems?.length) setProblems([]);
  }, [replacing, problems]);

  if (duelStatus === "INITIALIZED") {
    if (playerNum)
      return (
        <MathJax>
          <Box>
            <Text fontSize="1.2rem" mb="1em">
              Already seen some of these problems? Select the ones you'd like to
              drop from the problem set, hit the refresh button, and we'll
              replace them with new ones.
              <br />
              Ready up when you're satisfied.
            </Text>
            <Flex mb="1em" gap={1} justify="center" height="fit-content">
              <ButtonGroup>
                {problems.map((problem, index) => (
                  <Button
                    width="3.5em"
                    height="3.5em"
                    color={
                      selectedReplaceProblemIndices.includes(index)
                        ? selectedReplaceColor
                        : numberColor
                    }
                    border="solid 2px"
                    borderColor={
                      selectedReplaceProblemIndices.includes(index)
                        ? selectedReplaceColor
                        : "grey.100"
                    }
                    onClick={() => {
                      let updatedIndices;
                      if (selectedReplaceProblemIndices.includes(index)) {
                        updatedIndices = [];
                        for (
                          let i = 0;
                          i < selectedReplaceProblemIndices.length;
                          i++
                        ) {
                          if (selectedReplaceProblemIndices[i] !== index)
                            updatedIndices.push(
                              selectedReplaceProblemIndices[i]
                            );
                        }
                      } else {
                        updatedIndices = [
                          ...selectedReplaceProblemIndices,
                          index,
                        ];
                      }
                      setSelectedReplaceProblemIndices(updatedIndices);
                      handleUID();
                      let uid = localStorage.getItem("uid");
                      socket.emit("replace-problem-selected", {
                        roomId: id,
                        uid: uid,
                        updatedIndices: updatedIndices,
                      });
                    }}
                    variant="outline"
                    disabled={replacing}
                  >
                    {index + 1}
                  </Button>
                ))}
              </ButtonGroup>
              <Box ml="1em">
                <IconButton
                  boxSize="3.5em"
                  icon={<RepeatIcon />}
                  variant="solid"
                  colorScheme="primary"
                  isLoading={replacing}
                  onClick={handleReplace}
                  disabled={
                    selectedReplaceProblemIndices.length === 0 || replacing
                  }
                />
              </Box>
            </Flex>
            <Accordion
              onChange={(index) => {
                setSelectedProblem(index + 1);
              }}
              allowToggle
              boxShadow="2xl"
            >
              {console.count("Initialized Accordion Container")}
              {problems?.length
                ? problems.map((problem, index) => (
                    <AccordionItem key={problem?._id} border="none">
                      <h2>
                        <AccordionButton
                          height="3.5em"
                          bg={
                            index === selectedProblem - 1
                              ? selectedRowColor
                              : ""
                          }
                          _hover={"none"}
                          border="solid 1px"
                        >
                          <Box flex="2" textAlign="left">
                            {index + 1}. <b>{problem?.name}</b>
                          </Box>
                          <Box flex="1" textAlign="center">
                            <b>Rated:</b> {problem?.rating}, <b>Points:</b>{" "}
                            {problem.duelPoints}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel border="solid 1px" borderTop={"none"}>
                        <Box
                          className="problem-statement"
                          fontSize="0.95rem"
                          mb="-1.5em"
                        >
                          <div
                            className={(index === problems.length - 1) ? "MathJaxEnd" : ""}
                            dangerouslySetInnerHTML={{
                              __html: problem.content?.statement,
                            }}
                          ></div>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  ))
                : ""}
            </Accordion>
          </Box>
        </MathJax>
      );
    else
      return (
        <Text fontSize="1.2rem">
          This duel is no longer open and problems are being finalized.
        </Text>
      );
  } else {
    return problems?.length ? (
      <Accordion
        onChange={(index) => {
          setSelectedProblem(index + 1);
        }}
        allowToggle
        boxShadow="2xl"
      >
        {console.count("Ongoing Accordion Container")}
        {playerNum ? (
          ""
        ) : duelStatus === "ONGOING" ? (
          <Text fontSize="1.2rem" mb="1em">
            You are a spectator and may not submit to any problems in this duel.
          </Text>
        ) : (
          ""
        )}
        {problems.map((problem, index) => (
          <AccordionItem key={problem._id} border="none">
            <h2>
              <AccordionButton
                height="3.5em"
                bg={
                  index === selectedProblem - 1
                    ? problemVerdicts[index] === "AC"
                      ? rightAnswerSelectedColor
                      : problemVerdicts[index] === "WA"
                      ? wrongAnswerSelectedColor
                      : selectedRowColor
                    : problemVerdicts[index] === "AC"
                    ? rightAnswerColor
                    : problemVerdicts[index] === "WA"
                    ? wrongAnswerColor
                    : ""
                }
                _hover={"none"}
                border="solid 1px"
                borderColor={
                  index === selectedProblem - 1
                    ? problemVerdicts[index] === "AC"
                      ? rightAnswerColor
                      : problemVerdicts[index] === "WA"
                      ? wrongAnswerColor
                      : ""
                    : ""
                }
              >
                <Box flex="2" textAlign="left">
                  {index + 1}. <b>{problem?.name}</b>
                </Box>
                <Box flex="1" textAlign="center">
                  <b>Rated:</b> {problem?.rating}, <b>Points:</b>{" "}
                  {problem?.duelPoints}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              p={4}
              border="solid 1px"
              borderTop={"none"}
              borderColor={
                problemVerdicts[index] === "AC"
                  ? rightAnswerSelectedColor
                  : problemVerdicts[index] === "WA"
                  ? wrongAnswerSelectedColor
                  : ""
              }
            >
              {problem?.content?.constraints ? (
                <Flex
                  dangerouslySetInnerHTML={{
                    __html: problem.content?.constraints,
                  }}
                ></Flex>
              ) : (
                ""
              )}
              <Box mt={2} className="problem-statement" fontSize="0.95rem">
                <Text fontWeight="bold" fontSize="1.2rem">
                  Problem Statement
                </Text>
                {problem?.content?.statement ? (
                  <div
                    className={(index === problems.length-1) ? "MathJaxEnd" : ""}
                    dangerouslySetInnerHTML={{
                      __html: problem.content?.statement,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </Box>
              <Box
                mt={2}
                className="problem-input-specifications"
                fontSize="0.95rem"
              >
                <Text fontWeight="bold" fontSize="1.2rem">
                  Input
                </Text>
                {problem?.content?.input ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: problem.content?.input,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </Box>
              <Box
                mt={2}
                className="problem-output-specifications"
                fontSize="0.95rem"
              >
                <Text fontWeight="bold" fontSize="1.2rem">
                  Output
                </Text>
                {problem?.content?.output ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: problem.content?.output,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </Box>
              <Box
                mt={2}
                className="problem-sample-test-cases"
                fontSize="0.95rem"
                sx={{
                  " && .test-example-line.test-example-line-odd": {
                    backgroundColor: sampleTestLineColor,
                  },
                  " && .sample-test, .sample-test .title, .sample-test .input, .sample-test .output":
                    {
                      borderColor: defaultBorderColor,
                    },
                }}
              >
                {problem?.content?.testCases ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: problem.content?.testCases,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </Box>
              <Box mt={2} className="problem-note" fontSize="0.95rem">
                {problem?.content?.note ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: problem.content?.note,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </Box>
              <Center pt={3}>
                <Button
                  onClick={onOpen}
                  size="md"
                  fontSize="lg"
                  variant="solid"
                  colorScheme="primary"
                  isDisabled={duelStatus !== "ONGOING" || !playerNum}
                >
                  Submit Your Answer
                </Button>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        ))}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent top="0">
            <ModalHeader pb={0}>Submit Your Answer</ModalHeader>
            <ModalCloseButton />
            <ModalBody width="675px" pb={3}>
              <SubmitCodeEditor
                key="floating-editor"
                duelStatus={duelStatus}
                playerNum={playerNum}
                duelPlatform={duelPlatform}
                editorId="floating-editor"
                isPopup={true}
                problemChosen={selectedProblem}
                numProblems={problems.length}
                duelId={id}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Accordion>
    ) : (
      <Text fontSize="1.2rem">
        Problems will be generated when the duel is initialized (i.e. when
        someone joins).
      </Text>
    );
  }
};

export default AccordionContainer;
