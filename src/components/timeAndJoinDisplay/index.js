import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl, FormLabel, FormHelperText, 
  Input, InputRightElement, InputGroup,
  Button, IconButton,
  Text, 
  Center, VStack,  HStack,
  TableContainer, Table, Thead, Tbody, Tr, Th, Td,
  Skeleton,
  useToast
} from '@chakra-ui/react';
import Database, { handleUID } from '../../data';
import socket from '../../socket';
import { MdContentCopy } from 'react-icons/md';

const JoinDisplay = ({ id, playerNum }) => {
  const [username, setUsername] = useState();
  const [joining, setJoining] = useState(false);
  const toastRef = useRef();
  const toast = useToast();
  const link = `https://www.cpduels.com/play/${id}`;
  
  const handleJoin = (e) => {
    e.preventDefault();
    if (!username) setUsername("GUEST");
    setJoining(true);
    handleUID();
    let uid = localStorage.getItem('uid');
    socket.emit('join-duel', {roomId: id, handle: username, uid: uid});
  }

  useEffect(() => {
    socket.on('error-message', () => {
      setJoining(false);
    });

    return () => {
      socket.off('error-message');
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    makeToast({
      title: 'Copied!',
      description: 'The link is now in your clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }

  const makeToast = (toastParams) => {
    if (toastRef.current) {
      toast.close(toastRef.current);
    }
    toastRef.current = toast(toastParams);
  }

  return (
    (playerNum !== null) ?
      <VStack>
        <Text my={0} height='100%'>Wait for someone to join, or invite them:</Text>
        <InputGroup>
          <Input type='text' value={`https://www.cpduels.com/play/${id}`} 
            size='md' textOverflow='ellipsis' readOnly borderColor='grey.100'
            variant='outline'
          />
          <InputRightElement>
            <IconButton variant='outline' borderColor='grey.100' icon={<MdContentCopy />}
              onClick={copyToClipboard}
            />
          </InputRightElement>
        </InputGroup>
      </VStack>
       :
      <VStack height='100%'>
        <FormControl>
          <FormLabel my='auto'>Username (optional)</FormLabel>
          <Input
            mt={1}
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleJoin(e);
            }}
            borderColor='grey.100'
            width='10em'
          />
          <FormHelperText mt={1}>For problem filtering.</FormHelperText>
        </FormControl>
        <Button onClick={handleJoin} size='md' 
          loadingText="Joining" isLoading={joining}
          colorScheme='primary' variant='solid'
        >
          Join
        </Button>
      </VStack>
  );
}

const StartDisplay = ({ id, playerNum }) => {
  const [starting, setStarting] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    setStarting(true);
    handleUID();
    let uid = localStorage.getItem('uid');
    socket.emit('start-duel', {roomId: id, uid: uid});
  };

  return (
    (playerNum !== null) ? 
    <Center height='100%'>
      <Button onClick={handleStart} size='md'
        loadingText="Starting" isLoading={starting}
        colorScheme='primary' variant='solid'
      >
        Start Duel
      </Button>
    </Center>
    : <Text height='100%'>Duel is full.</Text>
  ); 
}

const TimeDisplay = ({ id }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    socket.on('time-left', ({roomId, timeLeft}) => {
      if (roomId === id) {
        setHours(Math.floor(timeLeft/3600));
        setMinutes(Math.floor(timeLeft/60)%60);
        setSeconds(timeLeft%60);
      }
    });

    return () => {
      socket.off('time-left');
    }
  }, []);
  
  return (
    <Text textAlign='center' textStyle='display1' py={0} height='100%'>
      {`${`${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0')}`}
    </Text>
  );
}

const ResultDisplay = ({ id }) => {
  const [result, setResult] = useState("");
  
  useEffect(() => {
    const getResult = async () => {
      let duel = await Database.getDuelById(id);
      let res = duel.result;
      if (res) {
        if (res[0] === "TIE") setResult("TIE");
        else setResult(`${res[1]} WINS!`)
      }
    }
    getResult();
  }, []);

  return (
    <Text height='100%'>{result}</Text>
  );
}

const TimeAndJoinDisplay = ({ id, duelStatus, playerNum }) => {
  const [title, setTitle] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (duelStatus === "READY") {
      setTitle((playerNum !== null) ? "Ready to Start?" : "Duel Full");
      setCurrentDisplay(<StartDisplay id={id} playerNum={playerNum} />);
    } else if (duelStatus === "ONGOING") {
      setTitle("Time Left");
      setCurrentDisplay(<TimeDisplay id={id} />);
    } else if (duelStatus === "FINISHED") {
      setTitle("Result");
      setCurrentDisplay(<ResultDisplay id={id} />);
    } else {
      setTitle((playerNum !== null) ? "Wait" : "Join");
      setCurrentDisplay(<JoinDisplay id={id} playerNum={playerNum} />);
    }
    if (duelStatus !== "") setLoading(false);
  }, [duelStatus, playerNum]);

  return (
    <TableContainer borderBottom='1px solid' width='22em'>
      <Table>
        <Thead>
          <Tr><Th textAlign='center' fontSize='1.2rem' borderColor='grey.500' py={2}>{title}</Th></Tr>
        </Thead>
        <Tbody>
          { loading ?
            <Tr><Skeleton height='fit-content'><Td px={1} py={1} height='8em'>{currentDisplay}</Td></Skeleton></Tr>
            : <Tr><Td px={1} py={1} height='8em'><Center>{currentDisplay}</Center></Td></Tr> }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TimeAndJoinDisplay;