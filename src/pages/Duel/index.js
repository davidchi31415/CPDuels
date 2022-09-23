import React, { useState, useEffect } from 'react';
import BaseLayout from '../../components/Base';
import ProblemsTable from './ProblemsTable';
import TimeTable from './TimeTable';
import ScoreTable from './ScoreTable';
import { useParams } from 'react-router-dom';
import socket from '../../components/socket.js';
import Database from '../../data';
import { useNavigate } from 'react-router-dom';
import './index.css';

const DuelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duelStatus, setDuelStatus] = useState("WAITING");
  // useEffect(async () => {
  //   let duel = await Database.getDuelById(id);
  //   console.log(duel);
  //   socket.disconnect();
  //   if (!duel._id) navigate('/404');
  // }, []) ;
  useEffect(() => {
    socket.on('connect', async () => {
      socket.emit('join', id);
      const duel = await Database.getDuelById(id);
      setDuelStatus(duel.status);
    });
    socket.on('status-change', (newStatus) => {
      setDuelStatus(newStatus);
    })
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
            <TimeTable roomId={id} duelStatus={duelStatus} />
            <ScoreTable />
          </div>
        </div>
      } />
  )
}

export default DuelPage;