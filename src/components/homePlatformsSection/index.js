import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import FakeCreateDuelForm from "../fakeCreateDuelForm";
import handleViewport from 'react-in-viewport';

const HomePlatformsSection = () => {
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const borderThickness = useColorModeValue("none", "solid 2px");

  const AnimatedCreateDuelForm = handleViewport(FakeCreateDuelForm);

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
            Up to 10 problems
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            Up to 180 minutes
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            2 players
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            3 platforms
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            Private duels
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            100% free
          </GridItem>
        </Grid>
      </Stack>
      <AnimatedCreateDuelForm />
    </Flex>
  );
};

export default HomePlatformsSection;
