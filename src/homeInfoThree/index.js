import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import FakeCreateDuelForm from "../fakeCreateDuelForm";
import handleViewport from 'react-in-viewport';

const HomeInfoThree = () => {
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const borderThickness = useColorModeValue("none", "solid 2px");
  const boldColor = useColorModeValue("primary.500", "primary.300");

  const AnimatedCreateDuelForm = handleViewport(FakeCreateDuelForm, { threshold: 0.5 });

  return (
    <Flex
      bg={backgroundColor}
      border={borderThickness}
      borderColor="primary.300"
      borderRightRadius="3rem"
      ml="-10em"
      pl="14em"
      pr="2.5em"
      py={5}
      gap="2.5em"
    >
      <Stack>
        <Text pt="3.5em" textStyle="body1" fontWeight="bold">
          Get going in seconds.
        </Text>
        <Text as="p" fontSize="1.2rem" maxWidth="21em">
          CPDuels automatically filters through thousands of problems to create
          problemsets tailored towards your needs. We'll find problems with the
          right difficulty and avoid ones you've already solved.
        </Text>
        <Text as="p" fontSize="1.2rem" maxWidth="21em">
          No need for Discord bots or manual work. Let us do it for you.
        </Text>
        <Grid
          templateColumns="repeat(2, 1fr)"
          rowGap={2}
          colGap={1}
          width="25em"
          height="fit-content"
          py={3}
        >
          <GridItem as="li" ml={0} colSpan={1}>
            Up to <Text as="span" fontWeight="bold" color={boldColor}>10</Text> problems
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            Up to <Text as="span" fontWeight="bold" color={boldColor}>180</Text> minutes
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>2</Text> players
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>3</Text> platforms
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>Private</Text> duels
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            100% <Text as="span" fontWeight="bold" color={boldColor}>free</Text>
          </GridItem>
        </Grid>
      </Stack>
      <AnimatedCreateDuelForm />
    </Flex>
  );
};

export default HomeInfoThree;
