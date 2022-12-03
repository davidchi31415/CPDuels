import React, { useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import ContactCard from "../components/contactContent/contactCard";
import ContactForm from "../components/contactContent/contactForm";
import BuyUsACoffee from "../components/contactContent/buyUsACoffee";
import handleViewport from "react-in-viewport";
import DavidSelfie from "../images/CPDuels_Contact_David.jpg";
import JeffreySelfie from "../images/CPDuels_Contact_Jeffrey.jpg";

const ContactPage = ({ report }) => {
  const infoDavid = {
    image: DavidSelfie,
    name: "David Chi",
    role: "Frontend",
    description: `I am a junior Computer Science student at Texas A&M. I am primarily focused on web development and machine learning,
    and I am seeking a software engineering internship where I can put my skills to use professionally.`,
    linkedin: "https://www.linkedin.com/in/david-chi-41392521a/",
    github: "https://github.com/davidchi31415",
  };
  const infoJeffrey = {
    image: JeffreySelfie,
    name: "Jeffrey Li",
    role: "Backend",
    description: `I am currently a junior at Texas A&M majoring in Computer Science. I am primarily focused on cybersecurity and am looking
    for cybersecurity internships and opportunities.`,
    linkedin: "https://www.linkedin.com/in/jeffrey-li-7b64b3221/",
    github: "https://github.com/JelBell1324",
  };

  const AnimatedContactCard = handleViewport(ContactCard, {
    threshold: 0.75,
  });

  const useReportRef = useRef();

  useEffect(() => {
    if (report && useReportRef.current) {
      useReportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [report]);

  return (
    <BaseLayout
      content={
        <Flex direction="column" align="center">
          <Text
            textStyle="display2"
            fontSize={["2.4rem", "3rem", "4rem"]}
            lineHeight={["3.2rem", "4.8rem"]}
            maxWidth="90vw"
            mx="auto"
          >
            Meet the Team
          </Text>
          <Flex
            gap={["3em", "5em"]}
            justify="center"
            maxWidth="90vw"
            flexWrap="wrap"
            pt={["1.25em", "2.5em"]}
            pb={["2.5em", "4em"]}
          >
            <AnimatedContactCard info={infoDavid} />
            <AnimatedContactCard info={infoJeffrey} />
          </Flex>
          <Box
            transform={[null, null, "scale(1.2)"]}
            my={[null, null, "1.5em"]}
            ref={useReportRef}
          >
            <ContactForm />
          </Box>
          <Text
            textStyle="display2"
            fontSize={["2.4rem", "3rem", "4rem"]}
            lineHeight={["3.2rem", "4.8rem"]}
            maxWidth="90vw"
            mx="auto"
            mt={[3, 5, "1em"]}
          >
            Support Us
          </Text>
          <Box mt={[3, 5]} mb={12} transform={["scale(1.2)", "scale(1.5)"]}>
            <BuyUsACoffee />
          </Box>
        </Flex>
      }
    />
  );
};

export default ContactPage;
