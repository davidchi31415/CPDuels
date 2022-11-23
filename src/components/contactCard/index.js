import {
  Box,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { SocialIcon } from "react-social-icons";

const ContactCard = ({ inViewport, forwardedRef, info }) => {
  const { colorMode, toggle } = useColorMode();
  const border = useColorModeValue(
    "solid 1px rgb(0, 0, 0, 0.5)",
    "solid 1px #7d7dff"
  );
  const shadow = useColorModeValue("2xl", "#7d7dff 0 8px 50px");
  const onHover = useColorModeValue(
    { boxShadow: "0 8px 50px" },
    { borderColor: "#ffd543", boxShadow: "#ffd543 0 8px 50px" }
  );
  const githubColor = useColorModeValue("", "#f3f3f3");
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  return (
    <div ref={forwardedRef}>
      <Box
        p={[3, 5]}
        rounded="md"
        border={
          isMobile
            ? inViewport
              ? colorMode === "light"
                ? "solid 1px rgb(0, 0, 0, 0.5)"
                : "solid 1px #ffd543"
              : border
            : border
        }
        boxShadow={
          isMobile
            ? inViewport
              ? colorMode === "light"
                ? "0 8px 50px"
                : "#ffd543 0 8px 50px"
              : shadow
            : shadow
        }
        width={["300px", "360px"]}
        height={["525px"]}
        _hover={isMobile ? "" : onHover}
        transition="border-color 0.5s ease, box-shadow 0.5s ease"
      >
        <Box
          borderRadius="100%"
          width="150px"
          height="150px"
          margin="0 auto"
          border="solid 1px"
        ></Box>
        <Text margin="5px auto 0" width="fit-content" textStyle="body2Semi">
          {info.name}
        </Text>
        <Text margin="0 auto" width="fit-content" fontSize="1.2rem">
          {info.role}
        </Text>
        <Text
          margin="5px auto"
          mb={["35px", "15px"]}
          width="100%"
          height="150px"
          fontSize={["0.9rem", "1rem"]}
        >
          {info.description}
        </Text>
        <Flex justify="center" gap={2} py={0}>
          <SocialIcon url={info.linkedin} />
          <SocialIcon url={info.github} bgColor={githubColor} />
        </Flex>
      </Box>
    </div>
  );
};

export default ContactCard;
