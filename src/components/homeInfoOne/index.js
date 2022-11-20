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
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import FakePlayPage from "./fakePlayPage.js";
import handleViewport from "react-in-viewport";

const HomeInfoOne = () => {
  const sectionColoredTitle = useColorModeValue("primary.900", "primary.300");
  const color = useColorModeValue("gray.900", "offWhite");

  return (
    <>
      <Text
        fontSize={["1.2rem", "1.5rem"]}
        lineHeight={["1rem", "1.2rem"]}
        fontWeight="bold"
        color={sectionColoredTitle}
        mb={0}
      >
        Instant Duel Creation
      </Text>
      <Text
        mt={0}
        fontWeight="bold"
        color={color}
        fontSize={["1.4rem", "2rem"]}
        lineHeight={["2.5rem", "2.8rem"]}
      >
        Get going in seconds.
      </Text>
      <Text align="center" color={color}
        fontSize={["0.9rem", "1.2rem"]}
        maxWidth={"95vw"}
      >
        With our easy-to-use duel creation system, you can be in your own coding battle within just a few clicks.<br />
        Or you can join someone else's — just choose from a pool of public duels.
      </Text>
      <FakePlayPage />
    </>
  );
};

export default HomeInfoOne;
