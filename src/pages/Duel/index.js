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
  const [duelStatus, setDuelStatus] = useState("WAITING");
  const [duelOwnership, setDuelOwnership] = useState(true);
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
      const ownership = duel.players[0].uid === localStorage.getItem('uid');
      setDuelOwnership(ownership);
    }
    getDuelInfo();
    socket.on('connect', async () => {
      socket.emit('join', {roomId: id});
  
    });
    socket.on('status-change', ({roomId, newStatus}) => {
      if (roomId == roomId) {
        console.log('status changed to ' + newStatus);
        setDuelStatus(newStatus);
      }
    });
    return () => {
      socket.off('connect');
      socket.off('status-change');
    };
  }, []);
  
  return (
    <BaseLayout content={
        <div className="duel__page">
          <ProblemsTable />
          <div className="duel__time__and__score">
            <TimeTable id={id} duelStatus={duelStatus} duelOwnership={duelOwnership} />
            <ScoreTable id={id} duelOwnership={duelOwnership} />
          </div>
        </div>
      } />
  )
}

export default DuelPage;