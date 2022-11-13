import React from "react";
import BaseLayout from "../components/baseLayout";
import WaitingDuelsTable from "../components/waitingDuelsTable";
import CreateDuelForm from "../components/createDuelForm";
import { Flex } from "@chakra-ui/react";

const PlayPage = () => {
  return (
    <BaseLayout
      content={
        <Flex justify="space-between">
          <WaitingDuelsTable />
          <CreateDuelForm />
        </Flex>
      }
    />
  );
};

export default PlayPage;
