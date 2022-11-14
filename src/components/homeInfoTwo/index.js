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
} from "@chakra-ui/react";
import FakeSubmitCodeEditor from "../fakeSubmitCodeEditor";

const HomeInfoTwo = () => {
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const borderThickness = useColorModeValue("none", "solid 2px");
  const boldColor = useColorModeValue("primary.500", "primary.300");

  return (
    <SimpleGrid
      columns={[1, 1, 2, 2, 2]}
      bg={backgroundColor}
      border={borderThickness}
      borderColor="primary.300"
      borderLeftRadius="3rem"
      mr={["-7em", "-9em", "-10em"]}
      pr={["8em", "12em", "14em"]}
      pl={["5em", null, "4em", null, "3em"]}
      py={5}
      spacing={["0em", null, "2.5em", null, "2.5em"]}
    >
      <Stack>
        <Text
          pt={["0em", null, "1em", "1.5em", "2.5em"]}
          textStyle="body1"
          fontWeight="bold"
        >
          Do it all on one website.
        </Text>
        <Text
          as="p"
          fontSize="1.2rem"
          maxWidth={["15em", null, null, null, "21em"]}
        >
          Submit your solutions to us and we'll submit to outside platforms for
          you. We also scrape the content of each problem so it is available in
          the duel.
        </Text>
        <Text
          as="p"
          fontSize="1.2rem"
          maxWidth={["15em", null, null, null, "21em"]}
        >
          This way, you can play on other platforms without ever leaving
          CPDuels.
        </Text>
        <Grid
          templateColumns="repeat(1, 1fr)"
          rowGap={2}
          colGap={1}
          width={["18em", null, null, null, "21em"]}
          height="fit-content"
          pt={3}
        >
          <GridItem as="li" ml={0} colSpan={1}>
            Content scraping for{" "}
            <Text as="span" fontWeight="bold" color={boldColor}>
              every problem
            </Text>
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>
              Submit
            </Text>{" "}
            through CPDuels
          </GridItem>
          <GridItem as="li" ml={0} colSpan={1}>
            <Text as="span" fontWeight="bold" color={boldColor}>
              Automatic
            </Text>{" "}
            result checking
          </GridItem>
        </Grid>
      </Stack>
      <Box
        transform={["scale(0.8)", "scale(0.8)", "scale(0.9)", "none", null]}
        mx={-12}
        mt={-6}
        pt={["0em", null, "2.5em", null, null]}
        mb={-6}
      >
        <FakeSubmitCodeEditor />
      </Box>
    </SimpleGrid>
  );
};

export default HomeInfoTwo;
