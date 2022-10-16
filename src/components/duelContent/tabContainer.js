import React, { useEffect, useState, useRef } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import AccordionContainer from "./accordionContainer";
import SubmitCodeEditor from "../submitCodeEditor";
import Database from "../../data";
import socket from '../../socket';

const TabContainer = ({ id, duelPlatform, duelStatus, playerNum, onMathJaxRendered }) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [index, setIndex] = useState(0);
  const [numProblems, setNumProblems] = useState(0);
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  useEffect(() => {
    const getNumProblems = async () => {
      let duel = await Database.getDuelById(id);
      setNumProblems(duel.problems.length);
    };
    getNumProblems();
    if (duelStatus === "ONGOING") {
      setIndex(1); // Go to problems tab
    }
  }, [duelStatus]);

  return (
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
        <TabPanel px={0}>
          <p>Some info...</p>
        </TabPanel>
        <TabPanel px={0}>
          <AccordionContainer
            id={id}
            duelPlatform={duelPlatform}
            duelStatus={duelStatus}
            playerNum={playerNum}
            onMathJaxRendered={onMathJaxRendered}
          />
        </TabPanel>
        <TabPanel px={0}>
          <SubmitCodeEditor key="stuck-editor" editorId="stuck-editor" 
            duelPlatform={duelPlatform} 
            duelId={id} numProblems={numProblems} 
          />
        </TabPanel>
        <TabPanel px={0}>
          <p>Submissions...</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabContainer;
