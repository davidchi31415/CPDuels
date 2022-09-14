import React from 'react';
import BaseLayout from '../../components/Base';

const Error404Page = () => {
  return (
    <BaseLayout content={
        <div className="error404__page">
          No such page.
        </div>
      } />
  )
}

export default Error404Page;