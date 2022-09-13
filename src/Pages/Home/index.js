import React from 'react';
import BaseLayout from '../../components/Base';
import './index.css';

const HomePageHero = () => {
  return(
    <div className="home__hero__container">
      <div className="home__hero__header">
        <div className="home__hero__title">
          A better way to practice coding
        </div>
        <div className="home__hero__description">
          Sharpen your programming skills by playing one-on-one live duels, with problems drawn from Leetcode, Codeforces, HackerRank, and more.
        </div>
      </div>
      <div className="home__hero__art">
        Art
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <BaseLayout content={
      <div className="home__page">
        <HomePageHero />
      </div>
    } />
  )
}

export default HomePage;