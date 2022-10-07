import React, { useState, useEffect } from "react";
import BaseLayout from "../components/baseLayout";
import Database from '../data';
import WaitingDuelsTable from "../components/waitingDuelsTable";

const PlayPage = () => {
  return (
    <BaseLayout content={
      <WaitingDuelsTable />
    } />
  );
}

export default PlayPage;