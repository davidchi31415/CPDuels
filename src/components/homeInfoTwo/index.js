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
import FakeSubmitCodeEditor from "../fakeSubmitCodeEditor";
import handleViewport from 'react-in-viewport';

const HomeInfoTwo = () => {
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const borderThickness = useColorModeValue("none", "solid 2px");
  const boldColor = useColorModeValue("primary.500", "primary.300");

  const AnimatedCreateDuelForm = handleViewport(FakeSubmitCodeEditor, { threshold: 0.5 });

  return (
    <Flex
      bg={backgroundColor}
      border={borderThickness}
      borderColor="primary.300"
      borderLeftRadius="3rem"
      mr="-10em"
      pr="14em"
      pl={0}
      py={0}
      gap={0}
    >
      <AnimatedCreateDuelForm />
      <Stack>
        <Text pt="5em" textStyle="body1" fontWeight="bold">
          Do it all on one website.
        </Text>
        <Text as="p" fontSize="1.2rem" maxWidth="40em">
          Submit your solutions to us and we'll submit to outside platforms for you.
          We also scrape the content of each problem so it is available in the duel.
        </Text>
        <Text as="p" fontSize="1.2rem">
          This way, you can play on other platforms without ever leaving CPDuels.
        </Text>
        <Grid
          templateColumns="repeat(1, 1fr)"
          rowGap={2}
          colGap={1}
          width="25em"
          height="fit-content"
          py={3}
        >
          <GridItem as="li" ml={0} colSpan={1}>
            Content scraping for <Text as="span" fontWeight="bold" color={boldColor}>every problem</Text>
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>Submit</Text> through CPDuels
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>Automatic</Text> submission result checking
          </GridItem>
        </Grid>
      </Stack>
    </Flex>
  );
};

export default HomeInfoTwo;
