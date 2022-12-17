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
            Join a duel by searching for an available row in the table of available duels.
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
            When someone joins the duel, a problem set is automatically generated. 
            You can chat with your partner and decide if you'd like to regenerate select problems.
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
            Once you and your duel partner have settled on a problem set, you can
            ready-up. The duel will begin and a timer will be set.
          </Text>
        </Box>
      </Flex>
      <Flex justify="space-between" gap="2em" mt="2em">
        <Box width="18em">
          <Flex>
            <Box 
              backgroundColor={circleIconBackgroundColor} width="3.5em" height="3.5em" 
              borderRadius="100%" color={circleIconColor} textAlign="center"
            ><Text pt="0.45em" fontSize="1.5rem" fontWeight="bold">4</Text></Box>
            <Text my="auto" ml="0.5em" fontSize="1.2rem">Solve Problems.</Text>
          </Flex>
          <Text mt="0.5em" ml="0.25em" fontSize="1.1rem">
            Possible points for a problem decrease with time - solve them as quickly as you can! 
            But keep in mind that each incorrect submission costs <b>50</b> points.
          </Text>
        </Box>
        <Box width="18em">
          <Flex>
            <Box 
              backgroundColor={circleIconBackgroundColor} width="3.5em" height="3.5em" 
              borderRadius="100%" color={circleIconColor} textAlign="center"
            ><Text pt="0.45em" fontSize="1.5rem" fontWeight="bold">5</Text></Box>
            <Text my="auto" ml="0.5em" fontSize="1.2rem">Win (or lose).<br />But have fun!</Text>
          </Flex>
          <Text mt="0.5em" ml="0.25em" fontSize="1.1rem">
            When the time is up or when both players have solved every problem, the duel automatically ends. Whoever has more points is
            declared winner.
          </Text>
        </Box>
      </Flex>
      <Text align="center" fontSize="1.2rem" mt="2em" width="18em">
        <Text as="span" fontWeight="bold">Please Note</Text><br />Waiting duels will be auto-aborted after <b>2 minutes</b> if not initialized (someone joining), and initialized duels will also be aborted if not started.
      </Text>
      <Text align="center" fontSize="1.2rem" mt="3em">
        We hope you enjoy using our platform! <br />
        If you discover an issue, please 
        <Link as="span" textDecoration="none" to="/contact/report-issue">
          <Text color={reportLinkColor} fontWeight="bold" as="span"> report it</Text>
        </Link> to us.
        <br />- CPDuels Team
      </Text>
    </Flex>
  );
}

export default PlayInfoSection;