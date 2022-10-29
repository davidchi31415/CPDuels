import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
  ButtonGroup,
  Button,
  useColorModeValue,
  Box,
  ScaleFade
} from "@chakra-ui/react";
import TextTransition from "react-text-transition";
import BaseLayout from "../components/baseLayout";
import HomeHeroCode from "../components/homeHeroCode";
import HomeFeaturesSection from "../components/homeFeaturesSection";
import HomePlatformsSection from "../components/homePlatformsSection";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const TEXTS = ["interview prep fun", "programming competitive", "practicing better"];
  const [textIndex, settextIndex] = useState(0);
  const textColor = useColorModeValue("primary.500", "primary.300");

  const ref1 = useRef(null);
  const isInViewport1 = useIsInViewport(ref1);
  const ref2 = useRef(null);
  const isInViewport2 = useIsInViewport(ref2);

  function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setIsIntersecting(entry.isIntersecting); // toggle
        }),
      []
    );

    useEffect(() => {
      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);

    return isIntersecting;
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <BaseLayout
      content={
        <Flex direction="column" pt="3em">
          <Flex align="center">
            <Stack width="35em" spacing="2" alignSelf="flex-end">
              <Text textStyle="display2" mb={0}>
                A better way to practice coding
              </Text>
              <Text textStyle="body2" mt={0}>
                Sharpen your programming skills by playing one-on-one live
                duels, with problems drawn from Leetcode, Codeforces, and more.
              </Text>
              <ButtonGroup pt={1}>
                <Button
                  fontSize="lg"
                  onClick={() => navigate("/play")}
                  width="12em"
                  variant="solid"
                  colorScheme="primary"
                >
                  Play for Free
                </Button>
                <Button
                  fontSize="lg"
                  onClick={() => navigate("/info")}
                  width="12em"
                  variant="outline"
                  colorScheme="primary"
                >
                  More Info
                </Button>
              </ButtonGroup>
            </Stack>
            <Spacer />
            <Center>
              <HomeHeroCode />
            </Center>
          </Flex>
          <Flex justify="center" pt="10em">
            <ScaleFade in={isInViewport1} ref={ref1}>
              <HomeFeaturesSection />
            </ScaleFade>
          </Flex>
          <Flex justify="center" pt="2em">
            <ScaleFade in={isInViewport2} ref={ref2}>
              <HomePlatformsSection />
            </ScaleFade>
          </Flex>
        </Flex>
      }
    />
  );
};

export default HomePage;
