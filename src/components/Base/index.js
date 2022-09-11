import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLink from '../PageLink';
import logo from '../../images/logo.png';
import './index.css';

const BaseNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="base__navbar__container">
      <div className="base__navbar">
        <img alt="CPDuels logo" className="logo" src={logo} onClick={() => navigate("/")} />
        <div className="base__navbar__links">
          <ul>
            <li><PageLink name="Play" destination="/play"/></li>
            <li><PageLink name="Tutorial" destination="/tutorial"/></li>
            <li><PageLink name="News" destination="/news"/></li>
            <li><PageLink name="Contact" destination="/contact"/></li>
          </ul>
        </div>
        <button className="base__login__button rounded">Login</button>
      </div>
    </nav>
  )
}

const BaseContainer = ({ content }) => {
  return (
    <div className="base__content__container">
      {content}
    </div>
  )
}

const BaseFooter = () => {
  return (
    <footer className="base__footer">
      Footer
    </footer>
  )
}

const  BaseLayout = ({ content }) => {
  return (
    <div className="base__layout">
      <BaseNavbar />
      <BaseContainer content={content} />
      <BaseFooter />
    </div>
  )
}

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
