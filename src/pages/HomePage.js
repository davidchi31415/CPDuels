import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
  ButtonGroup,
  Button,
  useColorMode,
  useColorModeValue,
  Box,
  ScaleFade,
} from "@chakra-ui/react";
import TextTransition from "react-text-transition";
import BaseLayout from "../components/baseLayout";
import HomeHeroCode from "../components/homeHeroCode";
import HomeInfoOne from "../components/homeInfoOne";
import HomeInfoTwo from "../components/homeInfoTwo";
import HomeInfoThree from "../components/homeInfoThree";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const { colorMode, toggle } = useColorMode();
  const infoSectionBackground = useColorModeValue("primary.400", "none");
  const infoSectionBorder = useColorModeValue("none", "solid 4px");
  const footerSectionBackground = useColorModeValue("offWhite", "grey.900");

  // const ref1 = useRef(null);
  // const isInViewport1 = useIsInViewport(ref1);
  // const ref2 = useRef(null);
  // const isInViewport2 = useIsInViewport(ref2);

  // function useIsInViewport(ref) {
  //   const [isIntersecting, setIsIntersecting] = useState(false);

  //   const observer = useMemo(
  //     () =>
  //       new IntersectionObserver(([entry]) => {
  //         if (entry.isIntersecting) setIsIntersecting(entry.isIntersecting); // toggle
  //       }),
  //     []
  //   );

  //   useEffect(() => {
  //     observer.observe(ref.current);

  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, [ref, observer]);

  //   return isIntersecting;
  // }

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <BaseLayout
      isHomePage={true}
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
          <Box
            bg={infoSectionBackground}
            border={infoSectionBorder}
            borderColor="primary.300"
            mt="5em"
            ml="-10em"
            mr="-10em"
            px="10em"
            pb="5em"
            borderTopRadius="100%"
            borderBottom="none"
            height="15em"
            position="relative"
          ></Box>
          <Box
            bg={infoSectionBackground}
            mt="-7.5em"
            ml="-10em"
            mr="-10em"
            px="10em"
            pb="10em"
            zIndex={10}
          >
            <Text
              textStyle="body1"
              align="center"
              pt={0}
              color={colorMode === "light" ? "offWhite" : "primary.100"}
            >
              Whatever your goals, CPDuels was built for you.
            </Text>
            <Flex justify="flex-start" pt="5em">
              <HomeInfoOne />
            </Flex>
            <Flex justify="flex-end" pt="2em">
              <HomeInfoTwo />
            </Flex>
            <Flex justify="flex-start" pt="2em">
              <HomeInfoThree />
            </Flex>
          </Box>
          <Box
            bg={footerSectionBackground}
            borderTop="solid 4px"
            borderTopColor="primary.400"
            mt="-7.5em"
            ml="-10em"
            mr="-10em"
            px="10em"
            zIndex={11}
            pb={0}
            borderTopRadius="100%"
            borderBottom="none"
            height="15em"
            position="relative"
          ></Box>
          <Box
            bg={footerSectionBackground}
            mt="-7.5em"
            ml="-10em"
            mr="-10em"
            px="10em"
            pb="5em"
            zIndex={12}
          >
            <Text textStyle="body1" align="center" pt={0}>
              What are you waiting for?
            </Text>
            <Center mt={2}>
              <Button
                fontSize="lg"
                onClick={() => navigate("/play")}
                width="12em"
                variant="solid"
                colorScheme="primary"
              >
                Play Now
              </Button>
            </Center>
          </Box>
        </Flex>
      }
    />
  );
};

export default HomePage;
