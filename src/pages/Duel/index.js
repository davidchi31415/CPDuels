import React from 'react';
import BaseLayout from '../../components/Base';
import ProblemsTable from './ProblemsTable';
import TimeTable from './TimeTable';
import ScoreTable from './ScoreTable';
import './index.css';

const DuelPage = () => {
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