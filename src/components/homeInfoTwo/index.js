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

const HomeInfoTwo = () => {
  const sectionColoredTitle = useColorModeValue("primary.200", "secondary.300");

  return (
    <>
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
        color="offWhite"
        fontSize={["1.4rem", "2rem"]}
        lineHeight={["2.5rem", "2.8rem"]}
      >
        Ready, Set, Code.
      </Text>
      <Text
        align="center"
        color="offWhite"
        fontSize={["0.9rem", "1.2rem"]}
        maxWidth={"95vw"}
      >
        Once you're in a duel, you can solve problems scraped from other platforms, all without
        leaving CPDuels.<br />
        May the best programmer win!
      </Text>
      <FakeDuelPage />
    </>
  );
};

export default HomeInfoTwo;
