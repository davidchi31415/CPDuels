import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Box,
  SimpleGrid,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import FakePlayPage from "./fakePlayPage.js";
import handleViewport from "react-in-viewport";

const HomeInfoOne = () => {
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const borderThickness = useColorModeValue("none", "solid 2px");
  const boldColor = useColorModeValue("primary.500", "primary.300");
  const sectionColoredTitle = useColorModeValue("primary.900", "primary.300");

  // const AnimatedCreateDuelForm = handleViewport(FakeCreateDuelForm, {
  //   threshold: 0.5,
  // });
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  // if (!isMobile) {
  //   return (
  //     <SimpleGrid columns={[1, 1, 2, 2, 2]} spacing={["0em", null, "2.5em"]}>
  //       <Stack mx={0} maxWidth={["15em", null, "20em"]}>
  //         <Text pt={["0em", null, "2.5em"]} textStyle="body1" fontWeight="bold">
  //           Get going in seconds.
  //         </Text>
  //         <Text
  //           as="p"
  //           fontSize={["0.8rem", "0.95rem", "1rem"]}
  //           lineHeight={["1rem", "1.2rem"]}
  //         >
  //           CPDuels automatically filters through thousands of problems to
  //           create problemsets tailored towards your needs. We'll find problems
  //           with the right difficulty and avoid ones you've already solved.
  //         </Text>
  //         <Text
  //           as="p"
  //           fontSize={["0.8rem", "0.95rem", "1rem"]}
  //           lineHeight={["1rem", "1.2rem"]}
  //         >
  //           No need for Discord bots or manual work. Let us do it for you.
  //         </Text>
  //         <Grid
  //           templateColumns="repeat(2, 1fr)"
  //           rowGap={2}
  //           colGap={1}
  //           height="fit-content"
  //           fontSize={["0.8rem", "0.95rem"]}
  //           lineHeight={["1rem", "1.2rem"]}
  //           pt={3}
  //         >
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             Up to{" "}
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               10
  //             </Text>{" "}
  //             problems
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             Up to{" "}
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               180
  //             </Text>{" "}
  //             minutes
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               2
  //             </Text>{" "}
  //             players
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               3
  //             </Text>{" "}
  //             platforms
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               Private
  //             </Text>{" "}
  //             duels
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             100%{" "}
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               free
  //             </Text>
  //           </GridItem>
  //         </Grid>
  //       </Stack>
  //       <Box
  //         transform={["scale(0.8)", "scale(0.8)", "scale(0.9)", "none", null]}
  //         mx={-12}
  //         mt={-6}
  //         pt={["0em", null, "2.5em", null, null]}
  //         mb={-6}
  //       >
  //         <AnimatedCreateDuelForm />
  //       </Box>
  //     </SimpleGrid>
  //   );
  // } else {
  //   return (
  //     <SimpleGrid
  //       columns={[1, 1, 2, 2, 2]}
  //       bg={backgroundColor}
  //       border={borderThickness}
  //       borderColor="primary.300"
  //       borderRadius="3rem"
  //       width="100%"
  //       p={3}
  //       spacing={["0em", null, "2.5em", null, "3.5em"]}
  //     >
  //       <Stack mx="auto">
  //         <Text
  //           pt={["0em", null, "1em", "1.5em", "2.5em"]}
  //           textStyle="body1"
  //           fontWeight="bold"
  //           fontSize={["1.4rem", "2rem"]}
  //           lineHeight={["2rem", "2.8rem"]}
  //         >
  //           Get going in seconds.
  //         </Text>
  //         <Text
  //           as="p"
  //           maxWidth={["300px", null, null, null, "21em"]}
  //           fontSize={["1rem", "1.6rem"]}
  //           lineHeight={["1.6rem", "2.4rem"]}
  //         >
  //           CPDuels automatically filters through thousands of problems to
  //           create problemsets tailored towards your needs. We'll find problems
  //           with the right difficulty and avoid ones you've already solved.
  //         </Text>
  //         <Text
  //           as="p"
  //           maxWidth={["300px", null, null, null, "21em"]}
  //           fontSize={["1rem", "1.6rem"]}
  //           lineHeight={["1.6rem", "2.4rem"]}
  //         >
  //           No need for Discord bots or manual work. Let us do it for you.
  //         </Text>
  //         <Grid
  //           templateColumns="repeat(2, 1fr)"
  //           rowGap={2}
  //           colGap={1}
  //           width={["18em", null, null, null, "21em"]}
  //           height="fit-content"
  //           pt={3}
  //         >
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             Up to{" "}
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               10
  //             </Text>{" "}
  //             problems
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             Up to{" "}
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               180
  //             </Text>{" "}
  //             minutes
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               2
  //             </Text>{" "}
  //             players
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               3
  //             </Text>{" "}
  //             platforms
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               Private
  //             </Text>{" "}
  //             duels
  //           </GridItem>
  //           <GridItem as="li" ml={0} colSpan={1}>
  //             100%{" "}
  //             <Text as="span" fontWeight="bold" color={boldColor}>
  //               free
  //             </Text>
  //           </GridItem>
  //         </Grid>
  //       </Stack>
  //       <Box
  //         transform={["scale(0.7)", "scale(0.8)", "scale(0.9)", "none", null]}
  //         mx={-14}
  //         mt={-6}
  //         pt={["0em", null, "2.5em", null, null]}
  //         mb={-6}
  //       >
  //         <AnimatedCreateDuelForm />
  //       </Box>
  //     </SimpleGrid>
  //   );
  // }
  return (
    <VStack>
      <Text
        fontSize={["1.2rem", "1.5rem"]}
        lineHeight={["1rem", "1.2rem"]}
        fontWeight="bold"
        color={sectionColoredTitle}
        mb={0}
      >
        Duel Creation
      </Text>
      <Text
        mt={0}
        fontWeight="bold"
        color="offWhite"
        fontSize={["1.4rem", "2rem"]}
        lineHeight={["2.5rem", "2.8rem"]}
      >
        Get going in seconds.
      </Text>
      <Text align="center" color="offWhite"
        fontSize={["0.9rem", "1.2rem"]}
        maxWidth={"95vw"}
      >
        With our easy-to-use duel creation system, you can be in your own coding battle within just a few clicks.<br />
        Or you can join someone else's — just choose from a pool of public duels.
      </Text>
      <FakePlayPage />
    </VStack>
  );
};

export default HomeInfoOne;
