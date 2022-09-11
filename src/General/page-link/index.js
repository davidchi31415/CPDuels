import React from 'react';
import { Link } from 'react-router-dom';


const PageLink = ({ destination, name}) => {
  return (
    <Link className={`page__link ${hover && "hover"}`} to={destination}>
      {name}
    </Link>
  )
}

export default PageLink;