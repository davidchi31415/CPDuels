import React from "react";
import { Text, Center } from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import Error404HeroCode from "../components/404Content/error404HeroCode";

const Error404Page = () => {
  return (
    <BaseLayout
      content={
        <Center
          transform={[null, null, "scale(1.2)", "scale(1.3)", "scale(1.5)"]}
          my={[2, 9, 10, 12, 14]}
        >
          <Error404HeroCode />
        </Center>
      }
    />
  );
};

export default Error404Page;
