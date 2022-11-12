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
  Grid, GridItem
} from "@chakra-ui/react";
import AccordionContainer from "./accordionContainer";
import SubmitCodeEditor from "../submitCodeEditor";
import Database from "../../data";
import socket from '../../socket';
import SubmissionsTable from "../submissionsTable";

const TabContainer = ({ id, duelPlatform, duelStatus, playerNum, onMathJaxRendered }) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [index, setIndex] = useState(0);
  const [numProblems, setNumProblems] = useState(0);
  const [duelInfo, setDuelInfo] = useState(null);

  useEffect(() => {
    const getDuelInfo = async () => {
      let duel = await Database.getDuelById(id);
      setNumProblems(duel.problems.length);
      setDuelInfo({
        players: duel.players, // list of player objects (needs .username)
        platform: duel.platform,
        timeLimit: duel.timeLimit,
        ratingMin: duel.ratingMin,
        ratingMax: duel.ratingMax,
        private: duel.private,
        status: duel.status,
        problemCount: duel.problemCount
      });
    };
    getDuelInfo();
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
        <TabPanel px='auto'>
          <Grid
            templateColumns="repeat(4, 1fr)"
            rowGap={2}
            width="40em"
            height="fit-content"
            py={0}
            fontSize='1.2rem'
          >
            <GridItem colSpan={1} fontWeight='bold'>Platform:</GridItem>
            <GridItem>{duelInfo ? duelInfo.platform : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight='bold'>Time Limit: </GridItem>
            <GridItem>{duelInfo ? `${duelInfo.timeLimit} min` : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight='bold'>Difficulty:</GridItem>
            <GridItem>{duelInfo ? `${duelInfo.ratingMin} - ${duelInfo.ratingMax}` : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight='bold'>Private:</GridItem>
            <GridItem>{duelInfo ? `${duelInfo.private ? "Yes" : "No"}` : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight='bold'>Status:</GridItem>
            <GridItem>{duelInfo ? duelInfo.status : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight='bold'>Problem Count:</GridItem>
            <GridItem>{duelInfo ? duelInfo.problemCount : "N/A"}</GridItem>
          </Grid>
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
          <SubmissionsTable duelId={id} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabContainer;
