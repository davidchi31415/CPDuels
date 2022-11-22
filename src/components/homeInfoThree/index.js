import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
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

  return (
    <Box transform={["scale(0.9)", "none"]}>
      <AnimatedPhone
        finished={phoneAnimationFinished}
        onFinished={() => setPhoneAnimationFinished(true)}
      />
    </Box>
  );
};

export default HomeInfoThree;
