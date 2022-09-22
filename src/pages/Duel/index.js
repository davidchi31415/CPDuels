import React, { useState, useEffect } from 'react';
import BaseLayout from '../../components/Base';
import ProblemsTable from './ProblemsTable';
import TimeTable from './TimeTable';
import ScoreTable from './ScoreTable';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import './index.css';

const socket = io("http://localhost:8081");

const DuelPage = () => {
  const { id } = useParams();

  const [isConn, setIsConn] = useState(false);
  const [timerVal, setTimerVal] = useState(200);
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('Join', id);
      socket.emit('Start Timer');
      setIsConn(true);
    });
    socket.on('timeLeft', (val) => {
      setTimerVal(val);
    });
    return () => {
      socket.off('connect');
    };
  }, []);
  
  return (
    <BaseLayout content={
        <div className="duel__page">
          <ProblemsTable />
          <div className="duel__time__and__score">
            <TimeTable timerVal={timerVal} />
            <ScoreTable />
          </div>
        </div>
      } />
  )
}

export default DuelPage;