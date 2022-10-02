import React from 'react';
import BaseLayout from '../../components/Base';
import './index.css';
import image1 from '../../images/home_hero_art_1.png';
import image2 from '../../images/home_hero_art_2.png';

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
        <img className="home__hero__art__image1" src={image1} />
        <img className="home__hero__art__image2" src={image2} />
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