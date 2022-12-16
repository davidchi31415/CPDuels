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
import DuelCounter from "../components/playContent/duelCounter";
import PlayInfoSection from "../components/playContent/playInfoSection";
import Database, { getUID } from "../data";
import { useNavigate } from "react-router-dom";

const TabContainer = ({ duels, setRefresh }) => {
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
            <WaitingDuelsTable duels={duels} setRefresh={setRefresh} />
          </Center>
        </TabPanel>
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <OngoingDuelsTable duels={duels} setRefresh={setRefresh} />
          </Center>
        </TabPanel>
        <TabPanel mt={0} transform={["scale(1.1)", "none"]}>
          <Center>
            <FinishedDuelsTable duels={duels} setRefres={setRefresh} />
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
          window.location.href = duelLink;
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
  const [duels, setDuels] = useState([]);
  const [duelCount, setDuelCount] = useState({active: 0, ongoing: 0, waiting: 0, initialized: 0});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const checkIfInDuel = async () => {
      let res = await Database.checkIfUserInDuel();
      if (res?.currentDuels?.length) {
        setInADuel(true);
        setCurrentDuelLink(res.currentDuels[0]);
      } else {
        setInADuel(false);
      }
    }
    const getDuels = async () => {
      let duels = await Database.getDuels();
      let duelCounterInfoUpdate = {active: 0, ongoing: 0, waiting: 0, initialized: 0};
      if (duels?.length) {
        setDuels(duels);
        duelCounterInfoUpdate.active = duels.filter(duel => duel.status !== "FINISHED" && duel.status !== "ABORTED").length;
        duelCounterInfoUpdate.waiting = duels.filter(duel => duel.status === "WAITING").length;
        duelCounterInfoUpdate.initialized = duels.filter(duel => duel.status === "INITIALIZED").length;
        duelCounterInfoUpdate.ongoing = duels.filter(duel => duel.status === "ONGOING").length;
      }
      setDuelCount(duelCounterInfoUpdate);
    };
    if (refresh) {
      checkIfInDuel();
      getDuels();
      setRefresh(false);
    }
  }, [inADuel, refresh]);

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
            <TabContainer duels={duels} setRefresh={setRefresh}/>
          </Box>
          <Box
          // transform={["scale(0.65)", "scale(0.65)", "scale(0.6)", "scale(0.8)", "none"]}
          // mx={["-5.5em", "-0.7em", "-5em", "-2em", 0]}
          // my={["-5em", "-6em", "-8.5em", "-4em", 0]}
          >
            <CreateDuelForm />
            <Box mt="1em">
              <DuelCounter duelCount={duelCount} />
            </Box>
          </Box>
          <PlayInfoSection />
        </Flex>
      }
    />
  );
};

export default PlayPage;