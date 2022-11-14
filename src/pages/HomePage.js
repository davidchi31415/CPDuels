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
  const infoSectionBackground = useColorModeValue("primary.400", "none");
  const infoSectionBorder = useColorModeValue("none", "solid 4px");
  const footerSectionBackground = useColorModeValue("offWhite", "grey.900");

  return (
    <BaseLayout
      isHomePage={true}
      content={
        <Flex direction="column" width="100%" pt={["0.5em", "1em", "2em", "3em"]}>
          <SimpleGrid columns={[1, 1, 1, 1, 2]} mx="auto" spacing={[2, 5]}>
            <Stack width={["19em", "30em", "35em"]} spacing="2" alignSelf="flex-end"
              mx="auto"
            >
              <Text textStyle="display2" mb={0} ml={[0, null, 4]}
                fontSize={["3rem", "4rem"]} lineHeight={["3.6rem", "4.8rem"]}
              >
                A better way to practice coding
              </Text>
              <Text textStyle="body2" mt={0}
                fontSize={["1.1rem", "1.6rem"]} lineHeight={["1.6rem", "2.4rem"]}
              >
                Sharpen your programming skills by playing one-on-one live
                duels, with problems drawn from Leetcode, Codeforces, and more.
              </Text>
              <ButtonGroup pt={1}>
                <Button
                  fontSize="lg"
                  onClick={() => navigate("/play")}
                  width="100%"
                  height={["3.5em", "3.2em", "3em"]}
                  variant="solid"
                  colorScheme="primary"
                >
                  Play for Free
                </Button>
              </ButtonGroup>
            </Stack>
            <Center transform={["scale(0.6)", "none"]} 
              mt={[-6, 0]} mb={[-14, -6, null, 0]}
            >
              <HomeHeroCode />
            </Center>
          </SimpleGrid>
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
              width={["8em", "13em", "fit-content"]} mx="auto" mt={[-8, -6, 0]} mb={[-6, -4, 0]}
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
            <Text textStyle="body1" align="center" pt={0}
              width={["7em", "fit-content"]} mx="auto" mt={[-8, 0]} mb={[6, 4]}
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
