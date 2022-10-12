import React, { useEffect, useState } from 'react';
import {
  TableContainer, Table, Thead, Tbody, Tr, Th, Td,
  Skeleton, 
  Square, Flex, VStack,
  Text,
  useColorModeValue,
  Grid, GridItem
} from '@chakra-ui/react';
import Database, { handleUID } from '../../data';
import socket from '../../socket';

const ScoreDisplay = ({ id, duelStatus, playerNum }) => {
  const [players, setPlayers] = useState([]);
  const [playerScores, setPlayerScores] = useState([]);
  const [problemScores, setProblemScores] = useState([]);

  const borderColor = useColorModeValue('rgb(0, 0, 0, 0.5)', 'rgb(255, 255, 255, 0.5)');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getPlayers = async () => {
      let duel = await Database.getDuelById(id);
      setPlayers(duel.players);
    }
    const updateScores = async () => {
      let duel = await Database.getDuelById(id);
      setPlayerScores([duel.playerOneScore, duel.playerTwoScore]);
      setProblemScores(duel.problems.map((problem) => [problem.playerOneScore, problem.playerTwoScore])); 
    }
    getPlayers();
    updateScores();
    
    socket.on('status-change', () => {
      getPlayers();
      updateScores();
    });

    socket.on('time-left', () => {
      getPlayers();
      updateScores();
    });

    return () => {
      socket.off('status-change');
      socket.off('time-left');
    }
  }, []);

  useEffect(() => {
    if (duelStatus !== "") setLoading(false);
  }, [duelStatus]);

  const renderScores = () => {
    return (
      <>
        <Tr>
          <Td height='15em' borderColor='grey.100'>
            <Grid templateColumns='repeat(2, 1fr)' rowGap={1} columnGap={0}>
              <GridItem>
                <Text textStyle='body3' textAlign='center'>Player 1</Text>
              </GridItem>
              <GridItem>
                <Text textStyle='body3' textAlign='center'>Score</Text>
              </GridItem>
              <GridItem>
                <Text textAlign='center' fontWeight='bold'>{players[0].handle}</Text>
              </GridItem>
              <GridItem>
                <Text textAlign='center' fontWeight='bold'>{playerScores[0]}</Text>
              </GridItem>
              <GridItem colSpan={2} mt={2}>
                <Flex justify='center' gap={1} flexWrap='wrap'>
                  {
                    problemScores.map(
                      (scores, index) => 
                        <VStack spacing={0}>
                          <Square boxSize='3rem' border='1px solid' rounded='md' borderColor={borderColor}
                            fontSize='sm' color='primary.500'
                          >
                            {scores[0]}
                          </Square>
                          <Text textAlign='center' fontSize='xs' pt={0}>{index+1}</Text>
                        </VStack>
                    )
                  }
                </Flex>
              </GridItem>
            </Grid>
          </Td>
        </Tr>
        <Tr>
          <Td height='15em'>
            <Grid templateColumns='repeat(2, 1fr)' rowGap={1} columnGap={0}>
              <GridItem>
                <Text textStyle='body3' textAlign='center'>Player 2</Text>
              </GridItem>
              <GridItem>
                <Text textStyle='body3' textAlign='center'>Score</Text>
              </GridItem>
              <GridItem >
                <Text textAlign='center' fontWeight='bold'>{(players.length === 2) ? players[1].handle : "N/A"}</Text>
              </GridItem>
              <GridItem>
                <Text textAlign='center' fontWeight='bold'>{(players.length === 2) ? playerScores[1] : 0}</Text>
              </GridItem>
              <GridItem colSpan={2} mt={2}>
                <Flex justify='center' flexWrap='wrap' gap={1}>
                  {
                    problemScores.map(
                      (scores, index) => 
                        <VStack spacing={0}>
                          <Square boxSize='3rem' rounded='md' border='1px solid' borderColor={borderColor}
                            fontSize='sm' color='primary.500' 
                          >
                            {scores[1]}
                          </Square>
                          <Text textAlign='center' fontSize='xs' pt={0}>{index+1}</Text>
                        </VStack>
                    )
                  }
                </Flex>
              </GridItem>
            </Grid>
          </Td>
        </Tr>
      </>
    );
  }

  return (
    <TableContainer 
      border='1px solid' borderColor={borderColor} 
      borderTopLeftRadius='md' borderTopRightRadius='md' width='22em' height='fit-content'
      boxShadow='2xl'
    >
      <Table>
        <Thead>
          <Tr><Th textAlign='center' fontSize='1.2rem' borderColor='grey.500' py={2}>Scores</Th></Tr>
        </Thead>
        <Tbody>
          { loading ?
            <Tr><Skeleton height='30em'><Td px={1} py={1} height='30em'></Td></Skeleton></Tr>
            : renderScores() }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ScoreDisplay;