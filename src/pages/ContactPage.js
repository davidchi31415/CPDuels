import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import ContactCard from "../components/contactCard";

const ContactPage = () => {
  const infoDavid = {
    name: "David Chi",
    role: "Frontend",
    description: 
    `I am a junior Computer Science student at Texas A&M. I am primarily focused on web development and machine learning,
    and I am seeking a software engineering internship where I can put my skills to use professionally.`,
    linkedin: 'https://www.linkedin.com/in/david-chi-41392521a/',
    github: 'https://github.com/davidchi31415',
  };
  const infoJeffrey = {
    name: "Jeffrey Li",
    role: "Backend",
    description: "",
    linkedin: 'https://www.linkedin.com/in/jeffrey-li-7b64b3221/',
    github: 'https://github.com/JelBell1324',
  };

  return (
    <BaseLayout
      content={
        <Flex direction="column" align="center">
          <Text
            textStyle="display2"
            fontSize={["2.4rem", "3rem", "4rem"]}
            lineHeight={["3.2rem", "4.8rem"]}
            maxWidth='90vw'
            mx='auto'
          >
            Meet the Team
          </Text>
          <Flex gap={["3em", "5em"]} justify="center" maxWidth='90vw' flexWrap='wrap' pt={["1.25em", "2.5em"]} pb="5em">
            <ContactCard info={infoDavid} />
            <ContactCard info={infoJeffrey} />
          </Flex>
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
