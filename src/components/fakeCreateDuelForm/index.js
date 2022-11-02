import React, { useEffect, useState, useRef } from "react";
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
  Checkbox,
} from "@chakra-ui/react";

const FakeCreateDuelForm = ({ inViewport, forwardedRef }) => {
  const [platform, setPlatform] = useState("CF");
  const [problemCount, setProblemCount] = useState(1);
  const [timeLimit, setTimeLimit] = useState(5);
  const [ratingMin, setRatingMin] = useState(800);
  const [ratingMax, setRatingMax] = useState(1200);
  const [username, setUsername] = useState();
  const [isPrivate, setIsPrivate] = useState(false);

  const problemCountError =
    Number.isNaN(problemCount) || problemCount < 1 || problemCount > 10;
  const timeLimitError =
    Number.isNaN(timeLimit) || timeLimit < 5 || timeLimit > 180;
  const ratingMinError =
    Number.isNaN(ratingMin) || ratingMin < 800 || ratingMin > 3000;
  const ratingMaxError =
    Number.isNaN(ratingMax) ||
    ratingMax < 800 ||
    ratingMax > 3000 ||
    ratingMax < ratingMin;

  const sliderThumbColor = useColorModeValue("grey.500", "secondary.900");

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  
  const exampleUsername = "davidchi";
  const [animationIndex, setAnimationIndex] = useState(0);

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    const animateProblemCount = async () => {
      await sleep(250);
      for (let i = 2; i < 6; i++) {
        setProblemCount(i);
        await sleep(5);
      }
      setAnimationIndex(i => i+1);
    }
    const animateTimeLimit = async () => {
      await sleep(250);
      for (let i = 2; i < 13; i++) {
        setTimeLimit(i*5);
        await sleep(50);
      }
      setAnimationIndex(i => i+1);
    }
    const animateRatingMin = async () => {
      await sleep(250);
      for (let i = 1; i < 11; i++) {
        setRatingMin(800+i*100);
        await sleep(50);
      }
      setAnimationIndex(i => i+1);
    }
    const animateRatingMax = async () => {
      await sleep(250);
      for (let i = 1; i < 11; i++) {
        setRatingMax(1200+i*100);
        await sleep(50);
      }
      setAnimationIndex(i => i+1);
    }
    const animateUsername = async () => {
      await sleep(250);
      for (let i = 0; i < exampleUsername.length; i++) {
        setUsername(exampleUsername.substring(0, i+1));
        await sleep(50);
      }
      setAnimationIndex(i => i+1);
    }
    if (inViewport && animationIndex < 6) {
      switch (animationIndex) {
        case 0:
          animateProblemCount();
          break;
        case 1:
          animateTimeLimit();
          break;
        case 2:
          animateRatingMax();
          break;
        case 3:
          animateRatingMin();
          break;
        case 4:
          animateUsername();
          break;
        case 5:
          setIsPrivate(true);
          setAnimationIndex(i => i+1);
          break;
      }
    }
  }, [inViewport, animationIndex]);

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
        transform="scale(0.9)"
        pointerEvents="none"
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
              <Select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                borderColor="grey.100"
              >
                <option value="CF">Codeforces</option>
                <option value="AT">AtCoder</option>
                <option value="LC">LeetCode</option>
              </Select>
            </Flex>
          </FormControl>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl isInvalid={problemCountError} isRequired>
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
                  onChange={(value) => setProblemCount(value)}
                  borderColor="grey.100"
                >
                  <NumberInputField width="5em" />
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
                  onChange={(value) =>
                    setProblemCount(Math.floor((value / 100) * 9) + 1)
                  }
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
              {problemCountError ? (
                <FormErrorMessage mt={0}>
                  Invalid problem count.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl isInvalid={timeLimitError} isRequired>
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
                  width="fit-content"
                  height="fit-content"
                  onChange={(value) => setTimeLimit(value)}
                  borderColor="grey.100"
                >
                  <NumberInputField width="5em" />
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
                  onChange={(value) =>
                    setTimeLimit(Math.floor(value / (100 / (175 / 5))) * 5 + 5)
                  }
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
              {timeLimitError ? (
                <FormErrorMessage mt={0}>Invalid time limit.</FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl isInvalid={ratingMinError} isRequired>
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
                  onChange={(value) => setRatingMin(value)}
                  onBlur={(e) =>
                    setRatingMin(Math.floor(e.target.value / 100) * 100)
                  }
                  borderColor="grey.100"
                >
                  <NumberInputField width="6em" />
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
                  onChange={(value) =>
                    setRatingMin(
                      Math.floor(((value / 100) * (3000 - 800)) / 100) * 100 +
                        800
                    )
                  }
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
              {ratingMinError ? (
                <FormErrorMessage mt={0}>
                  Invalid difficulty minimum.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <FormControl isInvalid={ratingMaxError} isRequired>
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
                  onChange={(value) => setRatingMax(value)}
                  onBlur={(e) =>
                    setRatingMax(Math.floor(e.target.value / 100) * 100)
                  }
                  borderColor="grey.100"
                >
                  <NumberInputField width="6em" />
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
                  onChange={(value) =>
                    setRatingMax(
                      Math.floor(((value / 100) * (3000 - 800)) / 100) * 100 +
                        800
                    )
                  }
                >
                  <SliderTrack bg="grey.100">
                    <SliderFilledTrack bg="primary.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="1em" bg={sliderThumbColor} />
                </Slider>
              </Center>
              {ratingMaxError ? (
                <FormErrorMessage mt={0}>
                  Invalid difficulty maximum.
                </FormErrorMessage>
              ) : (
                ""
              )}
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
                onChange={(e) => setUsername(e.target.value)}
                borderColor="grey.100"
                width="12em"
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
              variant="solid"
              colorScheme="primary"
            >
              Submit
            </Button>
          </Center>
        </GridItem>
      </Grid>
    </div>
  );
};

export default FakeCreateDuelForm;
