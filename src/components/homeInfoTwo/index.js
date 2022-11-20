import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Box,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import FakeDuelPage from "./fakeDuelPage.js";
import handleViewport from 'react-in-viewport';

const HomeInfoTwo = () => {
  const AnimatedDuelPage = handleViewport(FakeDuelPage, {
    threshold: 0.5,
  });

  const sectionColoredTitle = useColorModeValue("secondary.900", "secondary.300");
  const color = useColorModeValue("grey.900", "offWhite");

  return (
    <VStack>
      <Text
        fontSize={["1.2rem", "1.5rem"]}
        lineHeight={["1rem", "1.2rem"]}
        fontWeight="bold"
        color={sectionColoredTitle}
        mb={0}
      >
        Streamlined Gameplay
      </Text>
      <Text
        mt={0}
        fontWeight="bold"
        color={color}
        fontSize={["1.4rem", "2rem"]}
        lineHeight={["2.5rem", "2.8rem"]}
      >
        Ready, Set, Code.
      </Text>
      <Text
        align="center"
        color={color}
        fontSize={["0.9rem", "1.2rem"]}
        maxWidth={"95vw"}
      >
        Once you're in a duel, you can solve problems scraped from other platforms, all without
        leaving CPDuels.<br />
        May the best programmer win!
      </Text>
      <AnimatedDuelPage />
    </VStack>
  );
};

export default HomeInfoTwo;
