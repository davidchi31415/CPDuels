import React, { useEffect, useState, useRef } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Flex,
  useColorModeValue,
  TableContainer,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import FakeAccordionContainer from "./fakeAccordionContainer";
import SubmitCodeEditor from "../submitCodeEditor";

const FakeTabContainer = ({
  inViewport,
  forwardedRef,
  ready,
  finished,
  onFinished,
}) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );

  const [index, setIndex] = useState(finished ? 2 : 0);

  const [animationIndex, setAnimationIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [animatingProblems, setAnimatingProblems] = useState(false);
  const [problemsAnimated, setProblemsAnimated] = useState(false);

  useEffect(() => {
    const animateOpenProblemTab = async () => {
      setAnimating(true);
      await sleep(250);
      setIndex(1);
      await sleep(250);
      setAnimatingProblems(true);
      await sleep(14000);
      setAnimationIndex((i) => i + 1);
      setAnimating(false);
    };
    const animateOpenSubmitTab = async () => {
      setAnimating(true);
      await sleep(250);
      setIndex(2);
      setAnimationIndex((i) => i + 1);
      setAnimating(false);
      onFinished();
    };
    if (inViewport && animationIndex < 2 && ready && !animating && !finished) {
      switch (animationIndex) {
        case 0:
          animateOpenProblemTab();
          break;
        case 1:
          animateOpenSubmitTab();
          break;
      }
    }
  }, [finished, inViewport, animating, animationIndex, ready]);

  return (
    <div ref={forwardedRef}>
      <Tabs
        variant="line"
        borderColor={borderColor}
        width="47em"
        index={index}
        onChange={(index) => setIndex(index)}
        colorScheme="primary"
      >
        <TabList>
          <Flex width="100%">
            <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
              Duel Info
            </Tab>
            <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
              Problems
            </Tab>
            <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
              Submit
            </Tab>
            <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
              Submissions
            </Tab>
          </Flex>
        </TabList>

        <TabPanels border="none">
          <TabPanel px="auto">
            <Grid
              templateColumns="repeat(4, 1fr)"
              rowGap={2}
              width="40em"
              height="fit-content"
              py={0}
              fontSize="1.2rem"
            >
              <GridItem colSpan={1} fontWeight="bold">
                Platform:
              </GridItem>
              <GridItem>CF</GridItem>
              <GridItem colSpan={1} fontWeight="bold">
                Time Limit:{" "}
              </GridItem>
              <GridItem>120 min</GridItem>
              <GridItem colSpan={1} fontWeight="bold">
                Difficulty:
              </GridItem>
              <GridItem>1800 - 2200</GridItem>
              <GridItem colSpan={1} fontWeight="bold">
                Private:
              </GridItem>
              <GridItem>No</GridItem>
              <GridItem colSpan={1} fontWeight="bold">
                Status:
              </GridItem>
              <GridItem>{ready ? "ONGOING" : "READY"}</GridItem>
              <GridItem colSpan={1} fontWeight="bold">
                Problem Count:
              </GridItem>
              <GridItem>5</GridItem>
            </Grid>
          </TabPanel>
          <TabPanel px={0}>
            <FakeAccordionContainer
              inViewport={inViewport}
              ready={animatingProblems}
              finished={problemsAnimated}
              onFinished={() => setProblemsAnimated(true)}
            />
          </TabPanel>
          <TabPanel px={0} pt={-3} pb={0} transform="scale(0.97)">
            <SubmitCodeEditor
              key="stuck-editor"
              editorId="stuck-editor"
              duelPlatform={"CF"}
              numProblems={5}
            />
          </TabPanel>
          <TabPanel px={0}>Submissions...</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default FakeTabContainer;
