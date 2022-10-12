import React, { useState, useEffect } from 'react';
import {
  Box, Flex, VStack,
  Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalCloseButton, ModalFooter, 
  useDisclosure,
  Button
} from '@chakra-ui/react';
import BaseLayout from '../components/baseLayout';
import ProblemsTable from '../components/problemsTable';
import TimeAndJoinDisplay from '../components/timeAndJoinDisplay';
import ScoreDisplay from '../components/scoreDisplay';
import SubmitCodeEditor from '../components/submitCodeEditor';
import Database, { handleUID } from '../data';
import socket from '../socket';
import { useParams, useNavigate } from 'react-router-dom';
import TabContainer from '../components/problemsTable/tabContainer';

const DuelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duelStatus, setDuelStatus] = useState("");
  const [playerNum, setPlayerNum] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getDuelInfo = async () => {
      const duel = await Database.getDuelById(id);
      setDuelStatus(duel.status);
      handleUID();
      let uid = localStorage.getItem('uid');
      if (uid === duel.players[0].uid) {
        setPlayerNum(1);
      } else if (duel.players[1] && uid === duel.players[1].uid) {
        setPlayerNum(2);
      }
    }
    getDuelInfo();
    socket.on('connect', async () => {
      socket.emit('join', {roomId: id});
    });
    socket.on('error-message', (message) => {
      alert(message);
    });
    socket.on('status-change', ({roomId, newStatus}) => {
      console.log(roomId);
      if (roomId === id) {
        console.log('status changed to ' + newStatus);
        getDuelInfo();
      }
    });
    socket.on('time-left', ({roomId, timeLeft}) => {
      if (roomId === id) getDuelInfo();  
    });
    return () => {
      socket.off('connect');
      socket.off('error-message');
      socket.off('status-change');
      socket.off('time-left');
    };
  }, []);

  useEffect(() => {
    if (duelStatus === 'FINISHED') onOpen();
  }, [duelStatus]);

  return (
    <BaseLayout content={
      <Box>
        <Flex justify="space-between" align='flex-start'>
          <TabContainer id={id} duelStatus={duelStatus} playerNum={playerNum} />
          <VStack spacing={5}>
            <TimeAndJoinDisplay id={id} duelStatus={duelStatus} playerNum={playerNum} />
            <ScoreDisplay id={id} duelStatus={duelStatus} playerNum={playerNum} />
          </VStack>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size='sm'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Duel Is Over</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>You can view the results now.</p>
            </ModalBody>
            <ModalFooter justifyContent='center'>
              <Button colorScheme='primary' mr={3} onClick={onClose}>
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    } />
  );
}

export default DuelPage;