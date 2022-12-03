import React from "react";
import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PlayInfoSection = () => {
  const circleIconBackgroundColor = useColorModeValue("primary.500", "primary.400");
  const circleIconColor = useColorModeValue("offWhite", "grey.900");
  const reportLinkColor = useColorModeValue("primary.500", "primary.300");

  return (
    <Flex direction="column" align="center" width="100%" mt="3em" mb="7em">
      <Text
        textStyle="display2"
        fontSize={["2.4rem", "3rem", "4rem"]}
        lineHeight={["3.2rem", "4.8rem"]}
        maxWidth="90vw"
        mx="auto"
      >
        How to Play
      </Text>
      <Flex justify="space-between" gap="2em" mt="2em">
        <Box width="18em">
          <Flex>
            <Box 
              backgroundColor={circleIconBackgroundColor} width="3.5em" height="3.5em" 
              borderRadius="100%" color={circleIconColor} textAlign="center"
            ><Text pt="0.45em" fontSize="1.5rem" fontWeight="bold" ml="-0.1em">1</Text></Box>
            <Text my="auto" ml="0.5em" fontSize="1.2rem">Join or create a duel.</Text>
          </Flex>
          <Text mt="0.5em" ml="0.25em" fontSize="1.1rem">
            Join a duel by clicking on a row in the table of available duels. 
            You can search by username, rating, etc. to find one that suits you.
            Or make your own and wait for someone to join.
          </Text>
        </Box>
        <Box width="18em">
          <Flex>
            <Box
              backgroundColor={circleIconBackgroundColor} width="3.5em" height="3.5em" 
              borderRadius="100%" color={circleIconColor} textAlign="center"
            ><Text pt="0.45em" fontSize="1.5rem" fontWeight="bold">2</Text></Box>
            <Text my="auto" ml="0.5em" fontSize="1.2rem">Finalize problem set.</Text>
          </Flex>
          <Text mt="0.5em" ml="0.25em" fontSize="1.1rem">
            Once a duel has two players, we give you a preview of a freshly generated
            problem set, and you can now decide to drop some problems and regenerate as
            many times as you'd like.
          </Text>
        </Box>
        <Box width="18em">
          <Flex>
            <Box 
              backgroundColor={circleIconBackgroundColor} width="3.5em" height="3.5em" 
              borderRadius="100%" color={circleIconColor} textAlign="center"
            ><Text pt="0.45em" fontSize="1.5rem" fontWeight="bold">3</Text></Box>
            <Text my="auto" ml="0.5em" fontSize="1.2rem">Start the duel.<br />Get coding.</Text>
          </Flex>
          <Text mt="0.5em" ml="0.25em" fontSize="1.1rem">
            Once you and your duel partner have settled on a problem set, you can both
            ready-up, and the duel will begin automatically and a timer will be set. Have fun!
          </Text>
        </Box>
      </Flex>
      <Text align="center" fontSize="1.2rem" mt="2em" width="27em">
        <Text as="span" fontWeight="bold">Please Note</Text><br />Inactive duels will be auto-aborted after 5 minutes.
      </Text>
      <Text align="center" fontSize="1.2rem" mt="3em">
        We hope you enjoy using our platform. <br />
        If you discover an issue, please 
        <Link as="span" textDecoration="none" to="/contact/report-issue">
          <Text color={reportLinkColor} fontWeight="bold" as="span"> report it</Text>
        </Link> to us!
        <br />- CPDuels Team
      </Text>
    </Flex>
  );
}

export default PlayInfoSection;