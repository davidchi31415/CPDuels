import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";

const ContactPage = () => {
  return (
    <BaseLayout
      content={
        <Flex direction="column" align="center">
          <Text
            textStyle="display2"
            fontSize={["2.8rem", "3rem", "4rem"]}
            lineHeight={["3.6rem", "4.8rem"]}
          >
            Meet the Team
          </Text>
          <Text
            textStyle="body2"
            fontSize={["1.1rem", "1.6rem"]}
            lineHeight={["1.6rem", "2.4rem"]}
            mx="auto"
          >
            CPDuels is a personal project we developed over the course of Fall
            2022. It has taken the two of us countless hours to complete, so we
            hope you enjoy using it as much as we enjoyed building it.
            <br />
            Now here's a bit of info about us.
          </Text>
          <Text
            textStyle="display2"
            fontSize={["2.8rem", "3rem", "4rem"]}
            lineHeight={["3.6rem", "4.8rem"]}
          >
            Issues? Suggestions? Tell us!
          </Text>
        </Flex>
      }
    />
  );
};

export default ContactPage;
