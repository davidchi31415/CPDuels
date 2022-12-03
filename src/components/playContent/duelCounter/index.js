import React, { useState, useEffect } from "react";
import { 
  Box, Text, Flex
} from "@chakra-ui/react";
import Database from "../../../data";

const DuelCounter = () => {
  const [duelsActive, setDuelsActive] = useState(0);
  const [duelsWaiting, setDuelsWaiting] = useState(0);
  const [duelsInitialized, setDuelsInitialized] = useState(0);
  const [duelsOngoing, setDuelsOngoing] = useState(0);

  useEffect(() => {
    const getDuels = async () => {
      let duels = await Database.getDuels();
      if (duels?.length) {
        setDuelsActive(duels.filter(duel => duel.status !== "FINISHED" && duel.status !== "ABORTED").length);
        setDuelsWaiting(duels.filter(duel => duel.status === "WAITING").length);
        setDuelsInitialized(duels.filter(duel => duel.status === "INTIALIZED").length);
        setDuelsOngoing(duels.filter(duel => duel.status === "ONGOING").length);
      }
    }
    getDuels();
  }, []);

  return (
    <Flex justify="center" gap="3em" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="2xl">
      <Box my="auto">
        <Text fontSize="1.5rem" fontWeight="bold">Active Duels</Text>
        <Text fontSize="1.4rem" align="center">{duelsActive} / 50</Text>
      </Box>
      <Box fontSize="1.2rem">
        <Text>{duelsWaiting} duels waiting</Text>
        <Text>{duelsInitialized} duels initialized</Text>
        <Text>{duelsOngoing} duels ongoing</Text>
      </Box>
    </Flex>
  );
};

export default DuelCounter;