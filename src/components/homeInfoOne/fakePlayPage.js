import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  Switch,
  Grid,
  GridItem,
  Button,
  Center,
  Text,
  useToast,
  Checkbox,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import handleViewport from "react-in-viewport";
import FakeReactTable from "./fakeTableContainer.js";
import { MdRefresh } from "react-icons/md";

const FakeWaitingDuelsTable = ({ inViewport, forwardedRef, ready }) => {
  const borderColor = useColorModeValue("rgb(0, 0, 0, 0.5)", "grey.100");

  const originalData = [
    {
      platform: "CF",
      username: "apgpsoop",
      difficulty: "1800-2100",
      problemCount: 5,
      timeLimit: 160,
    },
    {
      platform: "LC",
      username: "Leofeng",
      difficulty: "Med-Hard",
      problemCount: 3,
      timeLimit: 120,
    },
    {
      platform: "LC",
      username: "cherrytree1324",
      difficulty: "Med-Hard",
      problemCount: 2,
      timeLimit: 30,
    },
    {
      platform: "CF",
      username: "asdf",
      difficulty: "1000-1100",
      problemCount: 1,
      timeLimit: 180,
    },
    {
      platform: "LC",
      username: "someone",
      difficulty: "Med-Hard",
      problemCount: 7,
      timeLimit: 120,
    },
    {
      platform: "AT",
      username: "anotherPerson",
      difficulty: "1900-2500",
      problemCount: 6,
      timeLimit: 180,
    },
    {
      platform: "AT",
      username: "yetAnother",
      difficulty: "1200-1600",
      problemCount: 4,
      timeLimit: 60,
    },
    {
      platform: "AT",
      username: "soManyPeople",
      difficulty: "1100-1200",
      problemCount: 1,
      timeLimit: 180,
    },
    {
      platform: "CF",
      username: "tourist",
      difficulty: "2500-3000",
      problemCount: 10,
      timeLimit: 10,
    },
  ];
  const [data, setData] = useState(originalData);
  const [platform, setPlatform] = useState("All");
  const [loading, setLoading] = useState(false);

  const [animated, setAnimated] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const animate = async () => {
      setAnimated(true);
      setLoading(true);
      setData([]);
      await sleep(1500);
      setData([
        ...originalData,
        {
          platform: "CF",
          username: "davidchi",
          difficulty: "1800-2200",
          problemCount: 5,
          timeLimit: 120,
        },
      ]);
      setLoading(false);
    };
    if (ready && inViewport && !animated) {
      animate();
    }
  }, [ready, inViewport, animated]);

  const columns = useMemo(
    () => [
      {
        Header: "⚔",
        accessor: "platform",
        disableSortBy: true,
        width: "4em",
      },
      {
        Header: "Username",
        accessor: "username",
        disableSortBy: true,
        width: "22em",
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
        width: "4em",
      },
      {
        Header: "# Problems",
        accessor: "problemCount",
        width: "3em",
      },
      {
        Header: "Time",
        accessor: "timeLimit",
        width: "3em",
      },
    ],
    []
  );

  return (
    <div ref={forwardedRef}>
      <VStack>
        <Flex width="100%" px={5} justify="space-between">
          <FormControl>
            <HStack spacing={0}>
              <FormLabel my="auto" mx={1}>
                Showing:
              </FormLabel>
              <Select
                value={platform}
                borderColor={borderColor}
                width="11em"
                textAlign="center"
              >
                <option value="All">All Platforms</option>
                <option value="CF">Codeforces</option>
                <option value="AT">AtCoder</option>
                <option value="LC">LeetCode</option>
              </Select>
            </HStack>
          </FormControl>
          <HStack spacing={0}>
            <FormLabel my="auto" mx={0} width="7em">
              Refresh Table
            </FormLabel>
            <IconButton
              variant="solid"
              colorScheme="primary"
              icon={<MdRefresh />}
            />
          </HStack>
        </Flex>
        <FakeReactTable loading={loading} data={data} columns={columns} />
      </VStack>
    </div>
  );
};

const FakeCreateDuelForm = ({
  inViewport,
  forwardedRef,
  finished,
  onFinished,
}) => {
  const [platform, setPlatform] = useState("CF");
  const [problemCount, setProblemCount] = useState(finished ? 5 : 1);
  const [timeLimit, setTimeLimit] = useState(finished ? 120 : 5);
  const [ratingMin, setRatingMin] = useState(finished ? 1800 : 800);
  const [ratingMax, setRatingMax] = useState(finished ? 2200 : 1200);
  const [username, setUsername] = useState(finished ? "davidchi" : "");
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sliderThumbColor = useColorModeValue("grey.500", "secondary.900");

  const borderColor = useColorModeValue("rgb(0, 0, 0, 0.5)", "grey.100");

  const exampleUsername = "davidchi";
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const animateProblemCount = async () => {
      setAnimating(true);
      setAnimationIndex((i) => i + 1);
      await sleep(1000);
      for (let i = 2; i < 6; i++) {
        setProblemCount(i);
        await sleep(50);
      }
      setAnimating(false);
    };
    const animateTimeLimit = async () => {
      setAnimating(true);
      setAnimationIndex((i) => i + 1);
      await sleep(250);
      for (let i = 2; i < 25; i++) {
        setTimeLimit(i * 5);
        await sleep(50);
      }
      setAnimating(false);
    };
    const animateRatingMin = async () => {
      setAnimating(true);
      setAnimationIndex((i) => i + 1);
      await sleep(250);
      for (let i = 1; i < 11; i++) {
        setRatingMin(800 + i * 100);
        await sleep(50);
      }
      setAnimating(false);
    };
    const animateRatingMax = async () => {
      setAnimating(true);
      setAnimationIndex((i) => i + 1);
      await sleep(250);
      for (let i = 1; i < 11; i++) {
        setRatingMax(1200 + i * 100);
        await sleep(50);
      }
      setAnimating(false);
    };
    const animateUsername = async () => {
      setAnimating(true);
      setAnimationIndex((i) => i + 1);
      await sleep(250);
      for (let i = 0; i < exampleUsername.length; i++) {
        setUsername(exampleUsername.substring(0, i + 1));
        await sleep(50);
      }
      setAnimating(false);
    };
    const animateSubmit = async () => {
      setAnimating(true);
      setAnimationIndex((i) => i + 1);
      await sleep(250);
      setSubmitting(true);
      await sleep(2000);
      setSubmitting(false);
      onFinished();
    };
    if (inViewport && animationIndex < 6 && !animating && !finished) {
      switch (animationIndex) {
        case 0:
          animateProblemCount();
          break;
        case 1:
          animateTimeLimit();
          break;
        case 2:
          animateRatingMin();
          break;
        case 3:
          animateRatingMax();
          break;
        case 4:
          animateUsername();
          break;
        case 5:
          animateSubmit();
          break;
      }
    }
  }, [finished, inViewport, animationIndex, animating]);

  return (
    <div ref={forwardedRef}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        rowGap={4}
        columnGap={3}
        width="30em"
        height="fit-content"
        border="1px solid"
        borderColor={borderColor}
        rounded="md"
        boxShadow="2xl"
        px={4}
        py={3}
      >
        <GridItem colSpan={2}>
          <Center>
            <Text textStyle="h1Semi" my={0}>
              Create Duel
            </Text>
          </Center>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl width="fit-content" isRequired>
            <Flex>
              <FormLabel my="auto">Platform</FormLabel>
              <Select value={platform} borderColor="grey.100" pl={2}>
                <option value="CF">Codeforces</option>
                <option value="AT">AtCoder</option>
                <option value="LC">LeetCode</option>
              </Select>
            </Flex>
          </FormControl>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl>
              <Flex justify="space-between">
                <FormLabel my="auto" mr={0}>
                  # Problems
                </FormLabel>
                <NumberInput
                  value={problemCount}
                  min={1}
                  max={10}
                  size="sm"
                  width="fit-content"
                  height="fit-content"
                  borderColor="grey.100"
                >
                  <NumberInputField width="5em" pl={2} />
                  <NumberInputStepper borderColor="grey.100">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Center>
                <Slider
                  mt={1}
                  width="12em"
                  focusThumbOnChange={false}
                  value={((problemCount - 1) * 100) / 9}
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl>
              <Flex justify="space-between">
                <FormLabel my="auto" mr={0}>
                  Time Limit (min)
                </FormLabel>
                <NumberInput
                  value={timeLimit}
                  min={5}
                  max={180}
                  step={5}
                  size="sm"
                  borderColor="grey.100"
                >
                  <NumberInputField width="5em" pl={2} />
                  <NumberInputStepper borderColor="grey.100">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Center>
                <Slider
                  mt={1}
                  width="12em"
                  focusThumbOnChange={false}
                  value={((timeLimit - 5) / 5) * (100 / (175 / 5))}
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl>
              <Flex justify="space-between">
                <FormLabel my="auto" mr={0}>
                  Difficulty Min
                </FormLabel>
                <NumberInput
                  value={ratingMin}
                  min={800}
                  max={3000}
                  step={100}
                  size="sm"
                  width="fit-content"
                  height="fit-content"
                  borderColor="grey.100"
                >
                  <NumberInputField width="6em" pl={2} />
                  <NumberInputStepper borderColor="grey.100">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Center>
                <Slider
                  mt={1}
                  width="12em"
                  focusThumbOnChange={false}
                  value={(ratingMin - 800) / 22}
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl>
              <Flex justify="space-between">
                <FormLabel my="auto" mr={0}>
                  Difficulty Max
                </FormLabel>
                <NumberInput
                  value={ratingMax}
                  min={800}
                  max={3000}
                  step={100}
                  size="sm"
                  width="fit-content"
                  height="fit-content"
                  borderColor="grey.100"
                >
                  <NumberInputField width="6em" pl={2} />
                  <NumberInputStepper borderColor="grey.100">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Center>
                <Slider
                  mt={1}
                  width="12em"
                  focusThumbOnChange={false}
                  value={(ratingMax - 800) / 22}
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl>
              <FormLabel my="auto">Username (optional)</FormLabel>
              <Input
                mt={1}
                type="text"
                value={username}
                borderColor="grey.100"
                width="12em"
                pl={2}
              />
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl>
              <FormLabel my="auto">Private?</FormLabel>
              <Switch
                mt={1}
                size="lg"
                colorScheme="primary"
                isChecked={isPrivate}
              />
              <FormHelperText mt={1}>
                Private matches don't show up on the table (invite-only).
              </FormHelperText>
            </FormControl>
          </Center>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <Checkbox size="md" borderColor="grey.100" defaultChecked={true}>
              Exclude attempted problems
            </Checkbox>
            <FormHelperText mt={1}>
              This uses your username (must be valid) on the selected platform.
              Otherwise, you can use any username you'd like.
            </FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Button
              size="md"
              fontSize="lg"
              loadingText="Creating"
              isLoading={submitting}
              variant="solid"
              colorScheme="primary"
            >
              Create
            </Button>
          </Center>
        </GridItem>
      </Grid>
    </div>
  );
};

const FakePlayPage = () => {
  const AnimatedCreateDuelForm = handleViewport(FakeCreateDuelForm, {
    threshold: 0.5,
  });
  const AnimatedWaitingDuelsTable = handleViewport(FakeWaitingDuelsTable, {
    threshold: 0.5,
  });
  const [duelCreationAnimationFinished, setDuelCreationAnimationFinished] =
    useState(false);
  const backgroundColor = useColorModeValue("offWhite", "grey.900");
  const largeBorder = useColorModeValue("none", "solid 1px #7d7dff");
  const largeShadow = useColorModeValue('2xl', "#7d7dff 0 8px 50px")
  return (
    <Flex
      backgroundColor={backgroundColor}
      p={5}
      gap={5}
      rounded='lg'
      boxShadow={largeShadow}
      border={largeBorder}
      transform="scale(0.85)"
      pointerEvents='none'
    >
      <AnimatedWaitingDuelsTable ready={duelCreationAnimationFinished} />
      <AnimatedCreateDuelForm
        finished={duelCreationAnimationFinished}
        onFinished={() => setDuelCreationAnimationFinished(true)}
      />
    </Flex>
  );
};

export default FakePlayPage;
