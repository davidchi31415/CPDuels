import React from 'react';
import BaseSidebar from '../base-sidebar';
import BaseContainer from '../base-container';
import './index.css';

const BaseLayout = () => {
  return (
    <div className="base__layout">
      <BaseSidebar />
      <BaseContainer />
    </div>
  )
}

export default BaseLayout;