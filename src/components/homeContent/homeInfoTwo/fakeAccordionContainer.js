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
  useColorModeValue,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import "./cfStyles.css";
import { MathJax } from "better-react-mathjax";

const FakeAccordionContainer = ({
  inViewport,
  ready,
  finished,
  onFinished,
}) => {
  const problem = {
    content: {
      constraints:
        '<div class="time-limit"><div class="property-title">time limit per test</div>2 seconds</div><div class="memory-limit"><div class="property-title">memory limit per test</div>256 megabytes</div><div class="input-file"><div class="property-title">input</div>standard input</div><div class="output-file"><div class="property-title">output</div>standard output</div></div><div>',
      statement:
        'You are playing a game called <span class="tex-font-style-it">Slime Escape</span>. The game takes place on a number line. Initially, there are (n) slimes. For all positive integers (i) where (1 le i le n), the (i)-th slime is located at position (i) and has health (a_i). You are controlling the slime at position (k). </p><p>There are two escapes located at positions (0) and (n+1). Your goal is to reach <span class="tex-font-style-bf">any one</span> of the two escapes by performing any number of game moves.</p><p>In one game move, you move your slime to the left or right by one position. However, if there is another slime in the new position, you must absorb it. When absorbing a slime, the health of your slime would be increased by the health of the absorbed slime, then the absorbed slime would be removed from the game.</p><p>Note that some slimes might have negative health, so your health would decrease when absorbing such slimes. </p><p>You lose the game immediately if your slime has negative health at any moment during the game.</p><p>Can you reach one of two escapes by performing any number of game moves, without ever losing the game?</p>',
      input:
        "<p>Each test contains multiple test cases. The first line contains a single integer (t) ((1 leq t leq 20,000)) — the number of test cases. Description of the test cases follows.</p><p>The first line of each test case contains two positive integers (n), (k) ((3 leq n leq 200,000), (1 leq k leq n)) — the number of slimes and the position of your slime.</p><p>The second line of each test case contains (n) integers, (a_1, a_2, ldots, a_n) ((-10^9 leq a_i leq 10^9)) — the health of the slimes.</p><p>It is guaranteed that health of your slime is non-negative ((a_k geq 0)), and all other slimes have non-zero health ((a_i \ne 0) for (i \ne k)).</p><p>It is guaranteed that the sum of (n) over all test cases does not exceed (200,000).</p>",
      output:
        '<p>For each test case, print &quot;<span class="tex-font-style-tt">YES</span>&quot; (without quotes) if you can escape without losing, and &quot;<span class="tex-font-style-tt">NO</span>&quot; (without quotes) otherwise.</p>',
      testCases: `<div class="sample-tests"><div class="section-title">Example</div><div class="sample-test"><div class="input"><div class="title">Input</div><pre>
      <div class="test-example-line test-example-line-even test-example-line-0">6</div><div class="test-example-line test-example-line-odd test-example-line-1">7 4</div><div class="test-example-line test-example-line-odd test-example-line-1">-1 -2 -3 6 -2 -3 -1</div><div class="test-example-line test-example-line-even test-example-line-2">3 1</div><div class="test-example-line test-example-line-even test-example-line-2">232 -500 -700</div><div class="test-example-line test-example-line-odd test-example-line-3">7 4</div><div class="test-example-line test-example-line-odd test-example-line-3">-1 -2 -4 6 -2 -4 -1</div><div class="test-example-line test-example-line-even test-example-line-4">8 4</div><div class="test-example-line test-example-line-even test-example-line-4">-100 10 -7 6 -2 -3 6 -10</div><div class="test-example-line test-example-line-odd test-example-line-5">8 2</div><div class="test-example-line test-example-line-odd test-example-line-5">-999 0 -2 3 4 5 6 7</div><div class="test-example-line test-example-line-even test-example-line-6">7 3</div><div class="test-example-line test-example-line-even test-example-line-6">7 3 3 4 2 1 1</div></pre></div><div class="output"><div class="title">Output</div><pre>
      YES
      YES
      NO
      YES
      NO
      YES
      </pre></div></div></div>`,
    },
  };

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const selectedRowColor = useColorModeValue("primary.300", "primary.700");
  const sampleTestLineColor = useColorModeValue("grey.100", "grey.700");

  const [animating, setAnimating] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [problemIndexOpen, setProblemIndexOpen] = useState(0);

  useEffect(() => {
    const animateOpenProblem = async () => {
      setAnimating(true);
      await sleep(1000);
      setProblemIndexOpen(1);
      setAnimating(false);
      onFinished();
    };
    if (inViewport && ready && !animating && !finished) {
      animateOpenProblem();
    }
  }, [finished, inViewport, animating, ready]);

  return (
    <Accordion
      index={problemIndexOpen ? problemIndexOpen - 1 : ""}
      allowToggle
      boxShadow="2xl"
    >
      <AccordionItem
        key={0}
        borderColor={borderColor}
        border="1px solid"
        maxHeight="36em"
        overflowY="hidden"
      >
        <h2>
          <AccordionButton
            bg={problemIndexOpen === 1 ? selectedRowColor : ""}
            _hover={problemIndexOpen === 1 ? { bg: selectedRowColor } : {}}
          >
            <Box flex="2" textAlign="left">
              1. <b>Slime Escape</b>
            </Box>
            <Box flex="1" textAlign="center">
              <b>Rated:</b> 1800, <b>Points:</b> 500
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4}>
          <MathJax>
            <Flex justify="space-between">
              {parse(problem.content.constraints)}
            </Flex>
            <Box mt={2} className="problem-statement" fontSize="0.95rem">
              <Text fontWeight="bold" fontSize="1.2rem">
                Problem Statement
              </Text>
              {parse(problem.content.statement)}
            </Box>
            <Box
              mt={2}
              className="problem-input-specifications"
              fontSize="0.95rem"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                Input
              </Text>
              {parse(problem.content.input)}
            </Box>
            <Box
              mt={2}
              className="problem-output-specifications"
              fontSize="0.95rem"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                Output
              </Text>
              {parse(problem.content.output)}
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
              {parse(problem.content.testCases)}
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
          </MathJax>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem key={1} borderColor={borderColor} border="1px solid">
        <h2>
          <AccordionButton>
            <Box flex="2" textAlign="left">
              2. <b>Reset K Edges</b>
            </Box>
            <Box flex="1" textAlign="center">
              <b>Rated:</b> 1900, <b>Points:</b> 600
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
      </AccordionItem>
      <AccordionItem key={2} borderColor={borderColor} border="1px solid">
        <h2>
          <AccordionButton>
            <Box flex="2" textAlign="left">
              3. <b>Zero-One (Hard Version)</b>
            </Box>
            <Box flex="1" textAlign="center">
              <b>Rated:</b> 2000, <b>Points:</b> 700
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
      </AccordionItem>
      <AccordionItem key={3} borderColor={borderColor} border="1px solid">
        <h2>
          <AccordionButton>
            <Box flex="2" textAlign="left">
              4. <b>Rectangular Congruence</b>
            </Box>
            <Box flex="1" textAlign="center">
              <b>Rated:</b> 2000, <b>Points:</b> 800
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
      </AccordionItem>
      <AccordionItem key={4} borderColor={borderColor} border="1px solid">
        <h2>
          <AccordionButton>
            <Box flex="2" textAlign="left">
              5. <b>Ela and the Wiring Wizard</b>
            </Box>
            <Box flex="1" textAlign="center">
              <b>Rated:</b> 2200, <b>Points:</b> 900
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
      </AccordionItem>
    </Accordion>
  );
};

export default FakeAccordionContainer;
