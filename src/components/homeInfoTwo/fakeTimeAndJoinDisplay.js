import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl, FormLabel, FormHelperText, 
  Input, InputRightElement, InputGroup,
  Button, IconButton, ButtonGroup,
  Text, 
  Center, VStack,  HStack,
  TableContainer, Table, Thead, Tbody, Tr, Th, Td,
  Skeleton,
  useToast, useColorModeValue
} from '@chakra-ui/react';

const StartDisplay = ({ starting }) => {

  return (
    <Button size='md'
      loadingText="Starting" isLoading={starting}
      colorScheme='primary' variant='solid'
    >
      Start Duel
    </Button>
  ); 
}

const TimeDisplay = () => {  
  return (
    <Text textAlign='center' textStyle='display2'>
      2:00:00
    </Text>
  );
}

const FakeTimeAndJoinDisplay = ({ inViewport, finished, onFinished }) => {
  const [currentDisplay, setCurrentDisplay] = useState(finished ? <TimeDisplay /> : <StartDisplay starting={false} />);

  const [animating, setAnimating] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const animate = async () => {
      setAnimating(true);
      await sleep(500);
      setCurrentDisplay(<StartDisplay starting={true} />);
      await sleep(2000);
      setCurrentDisplay(<TimeDisplay />);
      onFinished();
    };
    if (inViewport && !animating && !finished) {
      animate();
    }
  }, [finished, inViewport, animating]);

  const borderColor = useColorModeValue('rgb(0, 0, 0, 0.5)', 'rgb(255, 255, 255, 0.5)');

  return (
    <TableContainer 
      border='1px solid' borderColor={borderColor} 
      borderTopLeftRadius='md' borderTopRightRadius='md' width='22em'
      boxShadow='2xl'
    >
      <Table>
        <Thead>
          <Tr><Th textAlign='center' fontSize='1.2rem' borderColor='grey.500' py={2}>{finished ? "Time Left" : "Ready to Start?"}</Th></Tr>
        </Thead>
        <Tbody>
            <Tr><Td px={1} py={1} height='8em'><Center height='100%'>{currentDisplay}</Center></Td></Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default FakeTimeAndJoinDisplay;