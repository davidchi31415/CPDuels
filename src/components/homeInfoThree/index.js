import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  useColorMode, useColorModeValue,
  Box,
} from "@chakra-ui/react";
import ChatLight from '../../images/home_chat_light.png';
import ChatDark from '../../images/home_chat_dark_resized.png';

const HomeInfoThree = () => {
  const { colorMode, toggle } = useColorMode();
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const borderThickness = useColorModeValue("none", "solid 2px");
  const boldColor = useColorModeValue("primary.500", "primary.300");

  return (
    <Flex
      bg={backgroundColor}
      border={borderThickness}
      borderColor="primary.300"
      borderRightRadius="3rem"
      ml="-10em"
      pl="14em"
      pr="2.5em"
      py="3em"
      gap="1.5em"
    >
      <Stack>
        <Text pt="2.7em" textStyle="body1" fontWeight="bold">
          Play with your friends.
        </Text>
        <Text as="p" fontSize="1.2rem" maxWidth="25em">
          In addition to public duels with random people, you can also play a duel
          with your friends.
        </Text>
        <Text as="p" fontSize="1.2rem" maxWidth="25em">
          Just create a private duel and send them a link!
        </Text>
      </Stack>
      <Box p={2} py={3}
        bg={colorMode === "light" ? "white" : "black"}
        border="solid 1px" borderColor={colorMode === "light" ? "rgb(0, 0, 0, 0.5)" : "grey.500"} rounded="xl"
        boxShadow={colorMode === "light" ? "2xl" : "none"}
        height="420px" overflowY="hidden"
      >
        <img src={colorMode === "light" ? ChatLight : ChatDark} width="500px" />
      </Box>
    </Flex>
  );
};

export default HomeInfoThree;
