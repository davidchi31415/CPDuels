import React, { useState, useEffect } from 'react';
import BaseLayout from '../../components/Base';
import ProblemsTable from './ProblemsTable';
import TimeTable from './TimeTable';
import ScoreTable from './ScoreTable';
import { useParams } from 'react-router-dom';
import socket from '../../components/socket.js';
import Database, { handleUID } from '../../data';
import { useNavigate } from 'react-router-dom';
import './index.css';

const DuelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duelStatus, setDuelStatus] = useState("");
  const [duelOwnership, setDuelOwnership] = useState(true);
  const [playerNum, setPlayerNum] = useState(null);
  // useEffect(async () => {
  //   let duel = await Database.getDuelById(id);
  //   console.log(duel);
  //   socket.disconnect();
  //   if (!duel._id) navigate('/404');
  // }, []) ;
  useEffect(() => {
    const getDuelInfo = async () => {
      const duel = await Database.getDuelById(id);
      setDuelStatus(duel.status);
      handleUID();
      let uid = localStorage.getItem('uid');
      const ownership = duel.players[0].uid === uid;
      setDuelOwnership(ownership);
      if (uid === duel.players[0].uid) {
        setPlayerNum(1);
      } else if (uid === duel.players[1].uid) {
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
      if (roomId == roomId) {
        console.log('status changed to ' + newStatus);
        setDuelStatus(newStatus);
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
        <div className="duel__page">
          <ProblemsTable id={id} duelStatus={duelStatus} playerNum={playerNum} />
          <div className="duel__time__and__score">
            <TimeTable id={id} duelStatus={duelStatus} duelOwnership={duelOwnership} />
            <ScoreTable id={id} duelStatus={duelStatus} playerNum={playerNum} />
          </div>
        </div>
      } />
  )
}

export default DuelPage;