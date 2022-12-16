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
import "../../duelContent/cfStyles.css";
import { MathJax } from "better-react-mathjax";

const FakeAccordionContainer = ({
  inViewport,
  ready,
  finished,
  onFinished,
}) => {
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
        maxHeight="38em"
        overflowY="hidden"
      >
        <h2>
          <AccordionButton
            bg={problemIndexOpen === 1 ? selectedRowColor : ""}
            _hover={problemIndexOpen === 1 ? { bg: selectedRowColor } : {}}
          >
            <Box flex="2" textAlign="left">
              1. <b>Desktop Rearrangement</b>
            </Box>
            <Box flex="1" textAlign="center">
              <b>Rated:</b> 1800, <b>Points:</b> 500
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4}>
          <Flex>
            <div class="time-limit">
            <div class="property-title">time limit per test</div>3 seconds
          </div>
          <div class="memory-limit">
            <div class="property-title">memory limit per test</div>256 megabytes
          </div>
          <div class="input-file">
            <div class="property-title">input</div>standard input
          </div>
          <div class="output-file">
            <div class="property-title">output</div>standard output
          </div></Flex>
          <Box className="problem-statement">
            <p>Your friend Ivan asked you to help him rearrange his desktop. The desktop can be represented as a rectangle matrix of size \(n \times m\) consisting of characters '<span class="tex-font-style-tt">.</span>' (empty cell of the desktop) and '<span class="tex-font-style-tt">*</span>' (an icon).</p><p>The desktop is called <span class="tex-font-style-bf">good</span> if all its icons are occupying some prefix of full columns and, possibly, the prefix of the next column (and there are no icons outside this figure). In other words, some amount of first columns will be filled with icons and, possibly, some amount of first cells of the next (after the last full column) column will be also filled with icons (and all the icons on the desktop belong to this figure). This is pretty much the same as the real life icons arrangement.</p><p>In one move, you can take one icon and move it to any empty cell in the desktop.</p><p>Ivan loves to add some icons to his desktop and remove them from it, so he is asking you to answer \(q\) queries: what is the <span class="tex-font-style-bf">minimum</span> number of moves required to make the desktop <span class="tex-font-style-bf">good</span> after adding/removing one icon?</p><p>Note that <span class="tex-font-style-bf">queries are permanent</span> and change the state of the desktop.</p>
            <Text fontWeight="bold" fontSize="1.2rem">Input</Text><p>The first line of the input contains three integers \(n\), \(m\) and \(q\) (\(1 \le n, m \le 1000; 1 \le q \le 2 \cdot 10^5\)) — the number of rows in the desktop, the number of columns in the desktop and the number of queries, respectively.</p><p>The next \(n\) lines contain the description of the desktop. The \(i\)-th of them contains \(m\) characters '<span class="tex-font-style-tt">.</span>' and '<span class="tex-font-style-tt">*</span>' — the description of the \(i\)-th row of the desktop.</p><p>The next \(q\) lines describe queries. The \(i\)-th of them contains two integers \(x_i\) and \(y_i\) (\(1 \le x_i \le n; 1 \le y_i \le m\)) — the position of the cell which changes its state (if this cell contained the icon before, then this icon is removed, otherwise an icon appears in this cell).</p>
            <p>Print \(q\) integers. The \(i\)-th of them should be the <span class="tex-font-style-bf">minimum</span> number of moves required to make the desktop <span class="tex-font-style-bf">good</span> after applying the first \(i\) queries.</p>
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
