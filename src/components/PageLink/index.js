import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const PageLink = ({ destination, name}) => {
  return (
    <Link className='page__link' to={destination}>
      {name}
    </Link>
  )
}

export default PageLink;