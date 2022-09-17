import React from 'react';
import BaseLayout from '../../components/Base';
import WaitingDuelsTable from './WaitingDuelsTable';
import CreateDuelForm from './CreateDuelForm';
import './index.css';

const PlayPage = () => {
  return (
    <BaseLayout content={
        <div className="play__page">
          <WaitingDuelsTable />
          <CreateDuelForm />
        </div>
      } />
  )
}

export default PlayPage;