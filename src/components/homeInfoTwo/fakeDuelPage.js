import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  VStack,
  Button,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import FakeTimeAndJoinDisplay from "./fakeTimeAndJoinDisplay.js";
import FakeScoreDisplay from "./fakeScoreDisplay.js";
import FakeTabContainer from "./fakeTabContainer.js";
import { handleViewport } from "react-in-viewport";

const FakeDuelPage = () => {
  const [duelStatus, setDuelStatus] = useState("READY");
  const [playerNum, setPlayerNum] = useState();

  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const largeBorder = useColorModeValue("none", "solid 1px #ffd543");
  const largeShadow = useColorModeValue("2xl", "#ffd543 0 8px 50px");

  const [duelStartAnimationFinished, setDuelStartAnimationFinished] =
    useState(false);
  const [duelAnimationFinished, setDuelAnimationFinished] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const AnimatedTabContainer = handleViewport(FakeTabContainer, {
    threshold: 0.5,
  });
  const AnimatedTimeAndJoinDisplay = handleViewport(FakeTimeAndJoinDisplay, {
    threshold: 0.5,
  });

  if (isMobile) {
    return (
      <Box
        rounded="md"
        backgroundColor={backgroundColor}
        border={largeBorder}
        boxShadow={largeShadow}
        transform={["scale(0.47)", "scale(0.6)"]}
        height="40em"
        overflowY="hidden"
        overflowX="hidden"
        pointerEvents="none"
        my={["-8em", "-6em"]}
      >
        <AnimatedTabContainer
          ready={true}
          finished={duelAnimationFinished}
          onFinished={() => setDuelAnimationFinished(true)}
        />
      </Box>
    );
  } else {
    return (
      <Flex
        justify="space-between"
        gap={5}
        p={5}
        my={[null, null, "-7em", "-4em", 0]}
        rounded="md"
        backgroundColor={backgroundColor}
        border={largeBorder}
        boxShadow={largeShadow}
        transform={[null, null, "scale(0.6)", "scale(0.75)", "scale(0.87)"]}
        maxHeight="50em"
        overflowY="hidden"
        pointerEvents="none"
      >
        <AnimatedTabContainer
          ready={duelStartAnimationFinished}
          finished={duelAnimationFinished}
          onFinished={() => setDuelAnimationFinished(true)}
        />
        <VStack spacing={5}>
          <AnimatedTimeAndJoinDisplay
            finished={duelStartAnimationFinished}
            onFinished={() => setDuelStartAnimationFinished(true)}
          />
          <FakeScoreDisplay duelStatus={duelStatus} playerNum={playerNum} />
        </VStack>
      </Flex>
    );
  }
};

export default FakeDuelPage;
