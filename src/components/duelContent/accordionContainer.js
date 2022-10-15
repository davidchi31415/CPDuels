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
  Flex,
  Text,
} from "@chakra-ui/react";
import SubmitCodeEditor from "../submitCodeEditor";
import socket from "../../socket";
import Database, { handleUID } from "../../data";
import parse from "html-react-parser";
import "./cfStyles.css";

const AccordionContainer = ({
  id,
  onMathJaxRendered,
}) => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const getProblems = async () => {
      let duel = await Database.getDuelById(id);
      setProblems(duel.problems);
    };
    getProblems();

    socket.on("problem-change", async ({ roomId }) => {
      if (roomId === id) {
        await getProblems();
      }
    });

    return () => {
      socket.off("problem-change");
    };
  }, []);

  useEffect(() => {
    if (problems.length && !rendered) {
      console.log(problems.length);
      setRendered(true);
      onMathJaxRendered();
    }
  }, [problems]);

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const selectedRowColor = useColorModeValue("primary.300", "primary.700");
  const sampleTestLineColor = useColorModeValue("grey.100", "grey.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return problems?.length ? (
    <Accordion
      onChange={(index) => {
        setSelectedProblem(index + 1);
      }}
      allowToggle
      boxShadow="2xl"
    >
      {problems.map((problem, index) => (
        <AccordionItem
          key={problem._id}
          borderColor={borderColor}
          border="1px solid"
        >
          <h2>
            <AccordionButton
              bg={index === selectedProblem - 1 ? selectedRowColor : ""}
              _hover={
                index === selectedProblem - 1
                  ? { bg: selectedRowColor }
                  : {}
              }
            >
              <Box flex="2" textAlign="left">
                {index + 1}. <b>{problem.name}</b>
              </Box>
              <Box flex="1" textAlign="center">
                <b>Rated:</b> {problem.rating}, <b>Points:</b> {problem.points}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4}>
            {problem.content.constraints ? (
              <Flex justify="space-between">
                {parse(problem.content.constraints)}
              </Flex>
            ) : (
              ""
            )}
            <Box mt={2} className="problem-statement" fontSize="0.95rem">
              <Text fontWeight="bold" fontSize="1.2rem">
                Problem Statement
              </Text>
              {problem.content.statement
                ? parse(problem.content.statement)
                : ""}
            </Box>
            <Box
              mt={2}
              className="problem-input-specifications"
              fontSize="0.95rem"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                Input
              </Text>
              {problem.content.input ? parse(problem.content.input) : ""}
            </Box>
            <Box
              mt={2}
              className="problem-output-specifications"
              fontSize="0.95rem"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                Output
              </Text>
              {problem.content.output ? parse(problem.content.output) : ""}
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
                    borderColor: borderColor,
                  },
              }}
            >
              {problem.content.testCases
                ? parse(problem.content.testCases)
                : ""}
            </Box>
            <Box mt={2} className="problem-note" fontSize="0.95rem">
              {problem.content.note ? parse(problem.content.note) : ""}
            </Box>
            <Center pt={3}>
              <Button
                onClick={onOpen}
                size="md"
                fontSize="lg"
                variant="solid"
                colorScheme="primary"
              >
                Submit Your Answer
              </Button>
            </Center>
          </AccordionPanel>
        </AccordionItem>
      ))}
      <Modal
        isOpen={isOpen} onClose={onClose} size="2xl" motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent top='0'>
          <ModalHeader pb={0}>Submit Your Answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="675px" pb={3}>
            <SubmitCodeEditor
              key="floating-editor"
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
    <p>Problems will be generated when the duel starts.</p>
  );
};

export default AccordionContainer;
