import React, { useEffect, useState } from "react";
import BaseLayout from "../components/baseLayout";
import WaitingDuelsTable from "../components/waitingDuelsTable";
import CreateDuelForm from "../components/createDuelForm";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useColorModeValue,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import OngoingDuelsTable from "../components/ongoingDuelsTable";
import FinishedDuelsTable from "../components/finishedDuelsTable";
import Database, { handleUID } from "../data";
import { useNavigate } from "react-router-dom";

const TabContainer = () => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [index, setIndex] = useState(0);

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
            Ongoing Duels
          </Tab>
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Past Duels
          </Tab>
        </Flex>
      </TabList>

      <TabPanels border="none">
        <TabPanel px="auto" mt={2} transform={["scale(1.1)", "none"]}>
          <OngoingDuelsTable />
        </TabPanel>
        <TabPanel px="auto" mt={2} transform={["scale(1.1)", "none"]}>
          <FinishedDuelsTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const InADuelAlert = ({ duelLink }) => {
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);
  const backgroundColor = useColorModeValue("#ffa987", "");

  return (
    <Alert
      width={["19em", "25em", "45em", "60em", "72em"]}
      height={[null, null, "10vh", "12vh"]}
      status="warning"
      variant="left-accent"
      backgroundColor={backgroundColor}
    >
      <AlertIcon />
      <AlertTitle>You are currently in a duel!</AlertTitle>
      <Button
        variant="solid"
        colorScheme="primary"
        isLoading={navigating}
        ml={0}
        transform={[null, "scale(0.9)", null, "none"]}
        onClick={() => {
          setNavigating(true);
          navigate(duelLink);
        }}
      >
        Return
      </Button>
    </Alert>
  );
};

const PlayPage = () => {
  const [inADuel, setInADuel] = useState(false);
  const [currentDuelLink, setCurrentDuelLink] = useState();

  useEffect(() => {
    const checkIfInDuel = async () => {
      handleUID();
      let uid = localStorage.getItem("uid");
      let duelsOngoing = await Database.getDuelsOngoing();
      let duelsWaiting = await Database.getDuelsWaiting();
      let duelsInitialized = await Database.getDuelsInitialized();
      for (let i = 0; i < duelsOngoing.length; i++) {
        if (
          duelsOngoing[i].players[0].uid === uid ||
          duelsOngoing[i].players[1].uid === uid
        ) {
          setInADuel(true);
          setCurrentDuelLink(`/play/${duelsOngoing[i]._id}`);
          return;
        }
      }
      for (let i = 0; i < duelsWaiting.length; i++) {
        if (duelsWaiting[i].players[0].uid === uid) {
          setInADuel(true);
          setCurrentDuelLink(`/play/${duelsWaiting[i]._id}`);
          return;
        }
      }
      for (let i = 0; i < duelsInitialized.length; i++) {
        if (
          duelsInitialized[i].players[0].uid === uid ||
          duelsInitialized[i].players[1].uid === uid
        ) {
          setInADuel(true);
          setCurrentDuelLink(`/play/${duelsInitialized[i]._id}`);
          return;
        }
      }
    };
    checkIfInDuel();
  }, [inADuel]);

  return (
    <BaseLayout
      content={
        <Flex
          justify="space-between"
          gap={[0, null, null, null, 2]}
          flexWrap="wrap"
        >
          {inADuel ? (
            <Box mx="auto" mt={2} mb={3}>
              <InADuelAlert duelLink={currentDuelLink} />
            </Box>
          ) : (
            ""
          )}
          <Box
            transform={[
              "scale(0.5)",
              "scale(0.6)",
              "scale(0.65)",
              "scale(0.85)",
              "none",
            ]}
            ml={["-10.75em", "-6em", "-6em", "-2em", 0]}
            mr={["-14em", "-14em", "-14em", "-5em", 0]}
            my={["-9em", "-7em", "-7em", "-3em", 0]}
          >
            <WaitingDuelsTable />
          </Box>
          <Box
            transform={["scale(0.65)", "scale(0.65)", "scale(0.6)", "scale(0.8)", "none"]}
            mx={["-5.5em", "-0.7em", "-5em", "-2em", 0]}
            my={["-5em", "-6em", "-8.5em", "-4em", 0]}
          >
            <CreateDuelForm />
          </Box>
          <Box
            mx={["-14em", "-8.5em", "auto"]}
            mt={["-12em", "-8em", "-5em", 0]} mb={["-8em", "-8em", "-4em", 0]}
            transform={["scale(0.5)", "scale(0.6)", "scale(0.7)", "scale(0.9)", "none"]}
          >
            <TabContainer />
          </Box>
        </Flex>
      }
    />
  );
};

export default PlayPage;
