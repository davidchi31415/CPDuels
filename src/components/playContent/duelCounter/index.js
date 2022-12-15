import React, { useState, useEffect } from "react";
import { 
  Box, Text, Flex
} from "@chakra-ui/react";

const DuelCounter = ({ duelCount }) => {

  return (
    <Flex justify="center" gap="3em" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="2xl">
      <Box my="auto">
        <Text fontSize="1.5rem" fontWeight="bold">Active Duels</Text>
        <Text fontSize="1.4rem" align="center">{duelCount.active} / 50</Text>
      </Box>
      <Box fontSize="1.2rem">
        <Text>{duelCount.waiting} duels waiting</Text>
        <Text>{duelCount.initialized} duels initialized</Text>
        <Text>{duelCount.ongoing} duels ongoing</Text>
      </Box>
    </Flex>
  );
};

export default DuelCounter;