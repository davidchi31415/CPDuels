import React from 'react';
import BaseLayout from '../../components/Base';
import './index.css';

const HomeContent = () => {
  return (
    <div className="home__page">
      Hello
    </div>
  )
}

const HomePage = () => {
  return (
    <BaseLayout content={<HomeContent />} />
  )
}

export default HomePage;