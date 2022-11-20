import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, VStack, Button, useColorModeValue } from "@chakra-ui/react";
import FakeTimeAndJoinDisplay from "./fakeTimeAndJoinDisplay.js";
import FakeScoreDisplay from "./fakeScoreDisplay.js";
import FakeTabContainer from "./fakeTabContainer.js";
import { MathJax } from "better-react-mathjax";

const FakeDuelPage = ({ inViewport, forwardedRef }) => {
  const [duelStatus, setDuelStatus] = useState("READY");
  const [playerNum, setPlayerNum] = useState();

  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const largeBorder = useColorModeValue("none", "solid 1px #ffd543");
  const largeShadow = useColorModeValue("2xl", "#ffd543 0 8px 50px");

  const [duelStartAnimationFinished, setDuelStartAnimationFinished] =
    useState(false);
  const [duelAnimationFinished, setDuelAnimationFinished] = useState(false);

  useEffect(() => {});

  return (
    <div ref={forwardedRef}>
      <Flex
        justify="space-between"
        gap={5}
        p={5}
        rounded="md"
        backgroundColor={backgroundColor}
        border={largeBorder}
        boxShadow={largeShadow}
        transform="scale(0.87)"
      >
        <FakeTabContainer
          inViewport={inViewport}
          ready={duelStartAnimationFinished}
          finished={duelAnimationFinished}
          onFinished={() => setDuelAnimationFinished(true)}
        />
        <VStack spacing={5}>
          <FakeTimeAndJoinDisplay
            inViewport={inViewport}
            finished={duelStartAnimationFinished}
            onFinished={() => setDuelStartAnimationFinished(true)}
          />
          <FakeScoreDisplay duelStatus={duelStatus} playerNum={playerNum} />
        </VStack>
      </Flex>
    </div>
  );
};

export default FakeDuelPage;
