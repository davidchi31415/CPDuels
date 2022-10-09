import React, { useEffect, useState } from 'react';
import {
  FormControl, FormLabel, FormHelperText, FormErrorMessage,
  Input, Select, 
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, 
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  Switch,
  Grid, GridItem, Button, Center,
  Text
} from '@chakra-ui/react';
import AlertPop from "./alert.js";
import Database, { handleUID } from '../../data';
import { useNavigate } from 'react-router-dom';

const CreateDuelForm = () => {
  const [platform, setPlatform] = useState("CF");
  const [problemCount, setProblemCount] = useState(1);
  const [timeLimit, setTimeLimit] = useState(5);
  const [ratingMin, setRatingMin] = useState(800);
  const [ratingMax, setRatingMax] = useState(1200);
  const [username, setUsername] = useState();
  const [isPrivate, setIsPrivate] = useState(false);

  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const problemCountError = Number.isNaN(problemCount) || problemCount < 1 || problemCount > 10;
  const timeLimitError = Number.isNaN(timeLimit) || timeLimit < 5 || timeLimit > 180;
  const ratingMinError = Number.isNaN(ratingMin) || ratingMin < 800 || ratingMin > 3000;
  const ratingMaxError = Number.isNaN(ratingMax) || ratingMax < 800 || ratingMax > 3000 || ratingMax < ratingMin;    

  const sliderThumbColor = useColorModeValue("grey.500", "secondary.900");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrorMessage("");
    setSubmitting(true);
    if (problemCountError || timeLimitError || ratingMinError || ratingMaxError) {
      return;
    }
    if (problemCountError || timeLimitError || ratingMinError || ratingMaxError) return;
    handleUID();
    let uid = localStorage.getItem('uid');
    const duelData = {
      platform: platform,
      problemCount: problemCount,
      timeLimit: timeLimit,
      ratingMin: ratingMin,
      ratingMax, ratingMax,
      players: [{handle: `${username ? username : "GUEST"}`, uid: uid}],
      private: isPrivate
    };
    console.log(duelData);
    let duelID;
    await Database.addDuel(
        duelData
    ).then(
        res => {
            if (!res._id) {
                setServerErrorMessage(res.message);
                setSubmitting(false);
            } else {
                duelID = res._id;
                navigate(`/play/${duelID}`);
            }
        }
    );
  }

  return (
    <Grid templateColumns='repeat(2, 1fr)' rowGap={4} columnGap={3} width='30em' height='fit-content'
      border='1px solid' rounded='md'
      px={4} py={3}
    >
      <GridItem colSpan={2}>
      <Center>
        <Text textStyle="h1Semi" my={0}>Create Duel</Text>
      </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl width='fit-content' isRequired>
          <Flex>
            <FormLabel my="auto">Platform</FormLabel>
            <Select value={platform} onChange={(e) => setPlatform(e.target.value)}
              borderColor='grey.100'
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
          <FormLabel my="auto"># Problems</FormLabel>
          <NumberInput value={problemCount} min={1} max={10} size='sm' width='fit-content' height='fit-content'
            onChange={(value) => setProblemCount(value)}
            borderColor='grey.100'
          >
            <NumberInputField maxW={5} />
            <NumberInputStepper borderColor='grey.100'>
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
          value={(problemCount-1)*100/9}
          onChange={(value) => setProblemCount(Math.floor(value/100*9)+1)}
        >
          <SliderTrack bg='grey.100'>
            <SliderFilledTrack bg='primary.500'/>
          </SliderTrack>
          <SliderThumb boxSize='1em' bg={sliderThumbColor}/>
        </Slider>
        </Center>
        {problemCountError ? (
          <FormErrorMessage mt={0}>Invalid problem count.</FormErrorMessage>
        ) : ""}
      </FormControl>
      </Center>
      </GridItem>
      <GridItem>
      <Center>
      <FormControl isInvalid={timeLimitError} isRequired>
        <Flex justify="space-between">
          <FormLabel my="auto">Time Limit (min)</FormLabel>
          <NumberInput value={timeLimit} min={5} max={180} step={5} size='sm' width='fit-content' height='fit-content'
            onChange={(value) => setTimeLimit(value)}
            borderColor='grey.100'
          >
            <NumberInputField maxW={6} />
            <NumberInputStepper borderColor='grey.100'>
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
          value={(timeLimit-5)/5*(100/(175/5))}
          onChange={(value) => setTimeLimit(Math.floor(value/(100/(175/5)))*5+5)}
        >
          <SliderTrack bg='grey.100'>
            <SliderFilledTrack bg='primary.500'/>
          </SliderTrack>
          <SliderThumb boxSize='1em' bg={sliderThumbColor}/>
        </Slider>
        </Center>
        {timeLimitError ? (
          <FormErrorMessage mt={0}>Invalid time limit.</FormErrorMessage>
        ) : ""}
      </FormControl>
      </Center>
      </GridItem>
      <GridItem>
      <Center>
      <FormControl isInvalid={ratingMinError} isRequired>
        <Flex justify="space-between">
          <FormLabel my="auto">Difficulty Min</FormLabel>
          <NumberInput value={ratingMin} min={800} max={3000} step={100} size='sm' width='fit-content' height='fit-content'
            onChange={(value) => setRatingMin(value)}
            onBlur={(e) => setRatingMin(Math.floor(e.target.value/100)*100)}
            borderColor='grey.100'
          >
            <NumberInputField maxW={8} />
            <NumberInputStepper borderColor='grey.100'>
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
          value={(ratingMin-800)/22}
          onChange={(value) => setRatingMin(Math.floor((value/100)*(3000-800)/100)*100+800)}
        >
          <SliderTrack bg='grey.100'>
            <SliderFilledTrack bg='primary.500'/>
          </SliderTrack>
          <SliderThumb boxSize='1em' bg={sliderThumbColor}/>
        </Slider>
        </Center>
        {ratingMinError ? (
          <FormErrorMessage mt={0}>Invalid difficulty minimum.</FormErrorMessage>
        ) : ""}
      </FormControl>
      </Center>
      </GridItem>
      <GridItem>
      <Center>
      <FormControl isInvalid={ratingMaxError} isRequired>
        <Flex justify="space-between">
          <FormLabel my="auto">Difficulty Max</FormLabel>
          <NumberInput value={ratingMax} min={800} max={3000} step={100} size='sm' width='fit-content' height='fit-content'
            onChange={(value) => setRatingMax(value)}
            onBlur={(e) => setRatingMax(Math.floor(e.target.value/100)*100)}
            borderColor='grey.100'
          >
            <NumberInputField maxW={8} />
            <NumberInputStepper borderColor='grey.100'>
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
          value={(ratingMax-800)/22}
          onChange={(value) => setRatingMax(Math.floor((value/100)*(3000-800)/100)*100+800)}
        >
          <SliderTrack bg='grey.100'>
            <SliderFilledTrack bg='primary.500'/>
          </SliderTrack>
          <SliderThumb boxSize='1em' bg={sliderThumbColor}/>
        </Slider>
        </Center>
        {ratingMaxError ? (
          <FormErrorMessage mt={0}>Invalid difficulty maximum.</FormErrorMessage>
        ) : ""}
      </FormControl>
      </Center>
      </GridItem>
      <GridItem>
      <Center>
      <FormControl>
        <FormLabel my="auto">Username (optional)</FormLabel>
        <Input
          mt={1}
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(e)
          }}
          borderColor='grey.100'
          width="10em"
        />
        <FormHelperText mt={1}>
          For problem filtering.
        </FormHelperText>
      </FormControl>
      </Center>
      </GridItem>
      <GridItem>
      <Center>
      <FormControl>
        <FormLabel my="auto">Private?</FormLabel>
        <Switch mt={1} size='lg' colorScheme='primary'
          onChange={(e) => setIsPrivate(e.target.checked)} 
        />
        <FormHelperText mt={1}>
          Private matches don't show up on the table (invite-only).
        </FormHelperText>
      </FormControl>
      </Center>
      </GridItem>
      <GridItem colSpan={2}>
      <Center>
        <Button onClick={handleSubmit} size="md"
          loadingText="Submitting" isLoading={submitting}
        >
          Submit
        </Button>
      </Center>
      </GridItem>
      { serverErrorMessage ? 
        <GridItem colSpan={2}><Center><AlertPop title={`Server: ${serverErrorMessage}`}/></Center></GridItem> : ""}
    </Grid>
  );
}

export default CreateDuelForm;