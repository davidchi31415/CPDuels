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
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import "./cfStyles.css";

const FakeAccordionContainer = ({ indexOpen }) => {
  const problems = [
    {
      name: "Problem 1",
      rating: 1900,
      points: 400,
    },
    {
      name: "Problem 2",
      rating: 2000,
      points: 500
    }
  ];

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const selectedRowColor = useColorModeValue("primary.300", "primary.700");
  const sampleTestLineColor = useColorModeValue("grey.100", "grey.700");

  return problems?.length ? (
    <Accordion
      index={indexOpen ? indexOpen - 1 : ""}
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
              bg={index === indexOpen - 1 ? selectedRowColor : ""}
              _hover={
                index === indexOpen - 1 ? { bg: selectedRowColor } : {}
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
            <Flex justify="space-between">
            </Flex>
            <Box mt={2} className="problem-statement" fontSize="0.95rem">
              <Text fontWeight="bold" fontSize="1.2rem">
                Problem Statement
              </Text>
            </Box>
            <Box
              mt={2}
              className="problem-input-specifications"
              fontSize="0.95rem"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                Input
              </Text>
            </Box>
            <Box
              mt={2}
              className="problem-output-specifications"
              fontSize="0.95rem"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                Output
              </Text>
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
            </Box>
            <Box mt={2} className="problem-note" fontSize="0.95rem">
            </Box>
            <Center pt={3}>
              <Button
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
    </Accordion>
  ) : (
    <p>Problems will be generated when the duel starts.</p>
  );
};

export default FakeAccordionContainer;
