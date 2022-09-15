import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PageLink from '../PageLink';
import logo from '../../images/logo-offwhite.png';
import './index.css';

const theme = createTheme({
  palette: {
      primary: {
          main: "#2626FF"
      },
      background: {
          default: "f7f7f7"
      }
  },
  typography: {
      fontFamily: [
          "century-gothic, sans-serif"
      ]
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        CPDuels
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const BaseFooter = () => {
  return (
    <footer className="base__footer">
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </footer>
  )
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
