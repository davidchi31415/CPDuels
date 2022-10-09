import React, { useState, useEffect } from 'react';
import {
  FormControl, FormLabel, FormHelperText, 
  Input, Button, 
  Text, 
  Center, VStack, 
  TableContainer, Table, Thead, Tbody, Tr, Th, Td, 
} from '@chakra-ui/react';
import Database, { handleUID } from '../../data';
import socket from '../../socket';

const JoinDisplay = ({ id, playerNum }) => {
  const [username, setUsername] = useState();
  const [joining, setJoining] = useState(false);

  const usernameError = username === "";
  
  const handleJoin = (e) => {
    e.preventDefault();
    if (usernameError) return;
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

  return (
    (playerNum !== null) ?
      <Text>Wait for someone to join...</Text> :
      <VStack>
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
        <Button onClick={handleJoin} size='sm'
          loadingText="Joining" isLoading={joining}
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
    <Button onClick={handleStart} size='md'
      loadingText="Starting" isLoading={starting}
    >
      Start Duel
    </Button>
    : <Text>Duel is full.</Text>
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
    <Text textStyle="display2" m={0}>
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
    <Text>{result}</Text>
  );
}

const TimeAndJoinDisplay = ({ id, duelStatus, playerNum }) => {
  const [title, setTitle] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState();
  useEffect(() => {
    console.log(duelStatus);
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
  }, [duelStatus, playerNum]);

  return (
    <TableContainer borderBottom='1px solid' width='22em'>
      <Table>
        <Thead>
          <Tr><Th textAlign='center' fontSize='1.2rem' borderColor='grey.500'>{title}</Th></Tr>
        </Thead>
        <Tbody>
          <Tr><Td px={1}><Center>{currentDisplay}</Center></Td></Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TimeAndJoinDisplay;