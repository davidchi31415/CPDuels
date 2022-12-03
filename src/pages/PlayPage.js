import React, { useEffect, useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import CreateDuelForm from "../components/playContent/createDuelForm";
import WaitingDuelsTable from "../components/playContent/waitingDuelsTable";
import OngoingDuelsTable from "../components/playContent/ongoingDuelsTable";
import FinishedDuelsTable from "../components/playContent/finishedDuelsTable";
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
      width="41em"
      index={index}
      onChange={(index) => setIndex(index)}
      colorScheme="primary"
    >
      <TabList>
        <Flex width="100%">
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Available Duels
          </Tab>
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Ongoing Duels
          </Tab>
          <Tab borderColor={borderColor} fontSize="1.2rem" flex="1">
            Past Duels
          </Tab>
        </Flex>
      </TabList>

      <TabPanels border="none">
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <WaitingDuelsTable />
          </Center>
        </TabPanel>
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <OngoingDuelsTable />
          </Center>
        </TabPanel>
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <FinishedDuelsTable />
          </Center>
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
      height={[null, null, "3em", "4em"]}
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
        ml={5}
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
          gap={[0, null, null, null, 0]}
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
          // transform={[
          //   "scale(0.5)",
          //   "scale(0.6)",
          //   "scale(0.65)",
          //   "scale(0.85)",
          //   "none",
          // ]}
          // ml={["-10.75em", "-6em", "-6em", "-3em", 0]}
          // my={["-9em", "-7em", "-7em", "-3em", 0]}
          >
            <TabContainer />
          </Box>
          <Box
          // transform={["scale(0.65)", "scale(0.65)", "scale(0.6)", "scale(0.8)", "none"]}
          // mx={["-5.5em", "-0.7em", "-5em", "-2em", 0]}
          // my={["-5em", "-6em", "-8.5em", "-4em", 0]}
          >
            <CreateDuelForm />
          </Box>
        </Flex>
      }
    />
  );
};

export default PlayPage;
