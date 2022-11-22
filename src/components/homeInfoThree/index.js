import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Text,
  Flex,
  useColorMode,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Phone from "./phone.js";
import handleViewport from "react-in-viewport";

const HomeInfoThree = () => {
  const { colorMode, toggle } = useColorMode();
  const AnimatedPhone = handleViewport(Phone, {
    threshold: 0.5,
  });

  const [phoneAnimationFinished, setPhoneAnimationFinished] = useState(false);

  const sectionColoredTitle = useColorModeValue("primary.700", "primary.300");
  const color = useColorModeValue("grey.900", "offWhite");
  const footerSectionBackground = useColorModeValue("offWhite", "grey.900");
  const infoSectionBorder = useColorModeValue("none", "solid 4px");

  return (
    <Flex direction="column" justify="center" align="center">
      <Text
        fontSize={["1.2rem", "1.5rem"]}
        lineHeight={["1rem", "1.2rem"]}
        fontWeight="bold"
        color={sectionColoredTitle}
        mb={0}
      >
        Private Duels
      </Text>
      <Text
        mt={0}
        fontWeight="bold"
        color={color}
        fontSize={["1.4rem", "2rem"]}
        lineHeight={["2.5rem", "2.8rem"]}
        maxWidth="95vw"
      >
        Better with friends.
      </Text>
      <Text
        align="center"
        color={color}
        fontSize={["0.9rem", "1.2rem"]}
        maxWidth="95vw"
        pb={[0, "2em"]}
      >
        Play with your friends and colleagues and push each other to the limits
        <br />
        ⁠— it's as easy as sending a link.
      </Text>
      <Box transform={["scale(0.9)", "none"]}>
        <AnimatedPhone
          finished={phoneAnimationFinished}
          onFinished={() => setPhoneAnimationFinished(true)}
        />
      </Box>
      <Box
        bg={footerSectionBackground}
        borderTop={infoSectionBorder}
        borderTopColor="primary.400"
        width="125vw"
        zIndex={-1}
        pb={0}
        mt="-27em"
        borderTopRadius="100%"
        borderBottom="none"
        height="30em"
        position="relative"
      ></Box>
    </Flex>
  );
};

export default HomeInfoThree;
