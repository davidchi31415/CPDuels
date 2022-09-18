import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PageLink from '../PageLink';
import logo from '../../images/logo_f3f3f3.png';
import './index.css';

const theme = createTheme({
  palette: {
      primary: {
          main: "#2626FF"
      },
      background: {
          default: "#f3f3f3"
      }
  },
  typography: {
      fontFamily: [
          "century-gothic, sans-serif"
      ]
  },
  components: {
    MuiTableContainer: {
      variants: [
        {
          props: { variant: 'play__table' },
          style: {
            background: "#f7f7f7",
            border: "solid black 0.5px",
          }
        }
      ]
    },
    MuiContainer: {
      variants: [
        {
          props: { variant: 'play__form' },
          style: {
            background: "#f7f7f7",
            border: "solid black 0.5px",
            borderRadius: "4px",
          }
        }
      ]
    }
  }
});

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
        <div className="base__signup_login">
          <button className="base__signup__button button rounded" onClick={() => navigate("/signup")}>Sign Up</button>
          <button className="base__login__button button rounded" onClick={() => navigate("/login")}>Login</button>
        </div>
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
    <div className="base__footer">
      <div className="base__footer__text">
        2022 CPDuels.com<br/>
        Made by David Chi and Jeffrey Li.
      </div>
    </div>
  );
}

const  BaseLayout = ({ content }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="base__layout">
        <BaseNavbar />
        <BaseContainer content={content} />
        <BaseFooter />
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
