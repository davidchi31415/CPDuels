import React, { useState, useEffect } from 'react';
import BaseLayout from '../../components/Base';
import ProblemsTable from './ProblemsTable';
import TimeTable from './TimeTable';
import ScoreTable from './ScoreTable';
import { io } from 'socket.io-client';
import './index.css';

// const socket = io("http://localhost:8081");

const DuelPage = () => {
  // const [isConn, setIsConn] = useState(false);
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     socket.emit('Start Timer');
  //     setIsConn(true);
  //   });
  //   socket.on('disconnect', () => {
  //     socket.emit('Stop Timer');
  //     setIsConn(false);
  //   });
  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //   };
  // }, []);
  return (
    <BaseLayout content={
        <div className="duel__page">
          <ProblemsTable />
          <div className="duel__time__and__score">
            <TimeTable />
            <ScoreTable />
          </div>
        </div>
      } />
  )
}

export default DuelPage;