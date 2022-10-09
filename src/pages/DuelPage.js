import React, { useState, useEffect } from 'react';
import {
  Box, Flex, VStack
} from '@chakra-ui/react';
import BaseLayout from '../components/baseLayout';
import ProblemsTable from '../components/problemsTable';
import TimeAndJoinDisplay from '../components/timeAndJoinDisplay';
import Database, { handleUID } from '../data';
import socket from '../socket';
import { useParams, useNavigate } from 'react-router-dom';

const DuelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duelStatus, setDuelStatus] = useState("");
  const [playerNum, setPlayerNum] = useState(null);
  const [loading, setLoading] = useState(false);

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
      if (roomId === id) {
        console.log('status changed to ' + newStatus);
        getDuelInfo();
      }
    });
    return () => {
      socket.off('connect');
      socket.off('error-message');
      socket.off('status-change');
    };
  }, []);

  return (
    <BaseLayout content={
      <Box>
        <Flex justify="space-between">
          <ProblemsTable id={id} duelStatus={duelStatus} playerNum={playerNum} />
          <VStack border='1px solid' rounded='md'>
            <TimeAndJoinDisplay id={id} duelStatus={duelStatus} playerNum={playerNum} />
          </VStack>
        </Flex>
      </Box>
    } />
  );
}

export default DuelPage;