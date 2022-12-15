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
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import AccordionContainer from "./accordionContainer";
import SubmitCodeEditor from "./submitCodeEditor";
import Database from "../../data";
import socket from "../../socket";
import SubmissionsTable from "./submissionsTable";
import ChatBox from "./chatBox";

const TabContainer = ({
  id,
  duelPlatform,
  duelStatus,
  players,
  playerNum,
  problems,
  problemVerdicts,
  submissionsRefresh,
  onSubmissionsRefresh,
  submissionsToast,
  onSubmissionsToast,
  mathJaxRendered,
  onMathJaxRendered,
  replacingProblems,
  setReplacingProblems,
}) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [index, setIndex] = useState(0);
  const [numProblems, setNumProblems] = useState(0);
  const [duelInfo, setDuelInfo] = useState(null);
  const [unreadMessages, setUnreadmessages] = useState(0);

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
        problemCount: duel.problemCount,
      });
    };
    getDuelInfo();
    if (duelStatus === "ONGOING" || duelStatus === "INITIALIZED") {
      setIndex(1); // Go to problems tab
    }
  }, [duelStatus, replacingProblems, mathJaxRendered, id]);

  const mapLCDifficulty = (difficultyVal) => {
    switch (difficultyVal) {
      case 1:
        return "EASY";
      case 2:
        return "MEDIUM";
      default:
        return "HARD";
    }
  }

  return (
    <Tabs
      variant="line"
      borderColor={borderColor}
      width="47em"
      mt={[null, null, "-1em", 0]}
      index={index}
      onChange={(index) => setIndex(index)}
      colorScheme="primary"
    >
      {console.count("Tab Container")}
      <TabList>
        <Flex width="47em">
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
          {playerNum ? (
            <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
              Chat{unreadMessages ? ` (${unreadMessages})` : ""}
            </Tab>
          ) : (
            ""
          )}
        </Flex>
      </TabList>

      <TabPanels border="none" width="100%">
        <TabPanel mx="auto" width="45em">
          <Grid
            templateColumns="repeat(4, 1fr)"
            rowGap={2}
            width="100%"
            height="fit-content"
            py={0}
            fontSize="1.2rem"
          >
            <GridItem colSpan={1} fontWeight="bold">
              Platform:
            </GridItem>
            <GridItem>{duelInfo ? duelInfo.platform : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight="bold">
              Time Limit:{" "}
            </GridItem>
            <GridItem>
              {duelInfo ? `${duelInfo.timeLimit} min` : "N/A"}
            </GridItem>
            <GridItem colSpan={1} fontWeight="bold">
              Difficulty:
            </GridItem>
            <GridItem>
              {duelInfo
                ? (duelInfo.platform === "LC" ? 
                `${mapLCDifficulty(duelInfo.ratingMin)} - ${mapLCDifficulty(duelInfo.ratingMax)}`
                : `${duelInfo.ratingMin} - ${duelInfo.ratingMax}`)
                : "N/A"}
            </GridItem>
            <GridItem colSpan={1} fontWeight="bold">
              Private:
            </GridItem>
            <GridItem>
              {duelInfo ? `${duelInfo.private ? "Yes" : "No"}` : "N/A"}
            </GridItem>
            <GridItem colSpan={1} fontWeight="bold">
              Status:
            </GridItem>
            <GridItem>{duelInfo ? duelInfo.status : "N/A"}</GridItem>
            <GridItem colSpan={1} fontWeight="bold">
              Problem Count:
            </GridItem>
            <GridItem>{duelInfo ? duelInfo.problemCount : "N/A"}</GridItem>
          </Grid>
        </TabPanel>
        <TabPanel px={0}>
          <AccordionContainer
            id={id}
            duelPlatform={duelPlatform}
            duelStatus={duelStatus}
            playerNum={playerNum}
            problems={problems}
            problemVerdicts={problemVerdicts}
            mathJaxRendered={mathJaxRendered}
            onMathJaxRendered={onMathJaxRendered}
            replacing={replacingProblems}
            setReplacing={setReplacingProblems}
          />
        </TabPanel>
        <TabPanel px={0}>
          <SubmitCodeEditor
            key="stuck-editor"
            editorId="stuck-editor"
            duelStatus={duelStatus}
            duelPlatform={duelPlatform}
            duelId={id}
            numProblems={numProblems}
            problems={problems} // for getting snippets
          />
        </TabPanel>
        <TabPanel px={0}>
          <SubmissionsTable
            duelId={id}
            refresh={submissionsRefresh}
            onRefresh={onSubmissionsRefresh}
            toast={submissionsToast}
            onToast={onSubmissionsToast}
          />
        </TabPanel>
        {playerNum ? (
          <TabPanel px={0}>
            <Box width="fit-content" mx="auto">
              <ChatBox
                id={id}
                players={players}
                playerNum={playerNum}
                inView={index === 4}
                setUnreadmessages={setUnreadmessages}
              />
            </Box>
          </TabPanel>
        ) : (
          ""
        )}
      </TabPanels>
    </Tabs>
  );
};

export default TabContainer;
