import React from 'react';
import PageLink from '../page-link';
import './index.css';

const BaseSidebar = () => {
  return (
    <nav class="base__navbar">
      <div class="website__name">cp duels</div>
      <div class="base__navbar__links">
        <ul>
          <li><PageLink name="Play" destination="/play"/></li>
          <li><PageLink name="Tutorial" destination="/tutorial"/></li>
          <li><PageLink name="Contact" destination="/contact"/></li>
        </ul>
      </div>
    </nav>
  )
}

export default BaseSidebar;