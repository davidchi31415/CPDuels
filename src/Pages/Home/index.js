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
          Sharpen your programming skills by playing 1-v-1 live duels, using problems from Codeforces, HackerRank, Leetcode, and more.
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