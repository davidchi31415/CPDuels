import React from "react";
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
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import HomeHeroCode from "../components/homeHeroCode";
import HomeInfoOne from "../components/homeInfoOne";
import HomeInfoTwo from "../components/homeInfoTwo";
import HomeInfoThree from "../components/homeInfoThree";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const { colorMode, toggle } = useColorMode();
  const infoSection1Background = useColorModeValue("primary.100", "none");
  const infoSectionBorder = useColorModeValue("none", "solid 4px");
  const infoSection2Background = useColorModeValue("primary.500", "none");
  const footerSectionBackground = useColorModeValue("offWhite", "grey.900");

  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <BaseLayout
      content={
        <Flex direction="column">
          <SimpleGrid columns={1} mx="auto" spacing={[2, 5]}>
            <Center
              transform={[
                null,
                "scale(1.2)",
                "scale(1.3)",
                "scale(1.4)",
                "scale(1.5)",
              ]}
              height="fit-content"
              my={[2, 9, 10, 12, 14]}
            >
              <HomeHeroCode />
            </Center>
            <Stack
              width={["19em", "30em", "35em"]}
              spacing="2"
              mb="2em"
              ml={[1, 4, 6]}
            >
              <Text
                textStyle="display2"
                mb={0}
                fontSize={["2.8rem", "3rem", "4rem"]}
                lineHeight={["3.6rem", "4.8rem"]}
              >
                A better way to practice coding
              </Text>
              <Text
                textStyle="body2"
                mt={0}
                fontSize={["1.1rem", "1.6rem"]}
                lineHeight={["1.6rem", "2.4rem"]}
              >
                Sharpen your programming skills by playing one-on-one live
                duels, with problems drawn from Leetcode, Codeforces, and more.
              </Text>
              <ButtonGroup pt={1}>
                <Button
                  fontSize="lg"
                  onClick={() => navigate("/play")}
                  width={["100%", "95%"]}
                  height={["3.5em", "3.2em", "3em"]}
                  variant="solid"
                  colorScheme="primary"
                >
                  Play for Free
                </Button>
              </ButtonGroup>
            </Stack>
          </SimpleGrid>
          <Box
            bg={infoSection1Background}
            borderTop={infoSectionBorder}
            borderTopColor="primary.400"
            mt="5em"
            mx="calc(-50vw)"
            pb="5em"
            borderTopRadius="100%"
            borderBottom="none"
            height="15em"
            position="relative"
          ></Box>
          <Flex
            bg={infoSection1Background}
            mt={["-11em", "-12em"]}
            mx="calc(-50vw)"
            pb="5em"
            zIndex={9}
            direction="column"
            align="center"
          >
            <HomeInfoOne />
          </Flex>
          <Box
            bg={(colorMode === 'light') ? 'primary.500' : 'grey.900'}
            borderTop={infoSectionBorder}
            borderTopColor="secondary.500"
            mt="-8em"
            mx="calc(-50vw)"
            pb="5em"
            borderBottom="none"
            transform="auto"
            skewY="-4deg"
            height="15em"
            zIndex={10}
            position="relative"
          ></Box>
          <Flex
           bg={infoSection2Background}
           mt={["-12em", "-11em"]}
           mx="calc(-50vw)"
           pb="10em"
           zIndex={15}
           direction="column"
           align="center"
          >
            <HomeInfoTwo />
            {/* <HomeInfoThree /> */}
          </Flex>
          <Box
            bg={footerSectionBackground}
            borderTop="solid 4px"
            borderTopColor="primary.400"
            mt="-7.5em"
            mx="calc(-50vw)"
            zIndex={16}
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
            zIndex={17}
          >
            <Text
              textStyle="body1"
              align="center"
              pt={0}
              width={["7em", "fit-content"]}
              mx="auto"
              mt={[-8, 0]}
              mb={[6, 4]}
            >
              What are you waiting for?
            </Text>
            <Center mt={2}>
              <Button
                fontSize="lg"
                onClick={() => navigate("/play")}
                width="12em"
                height={["3.5em", "3.2em", "3em"]}
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
