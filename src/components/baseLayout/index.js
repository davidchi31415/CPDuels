import React from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  HStack,
  Image,
  Text,
  IconButton,
  Link,
  useColorMode,
  useMediaQuery,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
} from "@chakra-ui/react";
import { WiDaySunny } from "react-icons/wi";
import { IoMoon } from "react-icons/io5";
import LightLogo from "../../images/CPDuels Logo Light - NEW.svg";
import DarkLogo from "../../images/CPDuels Logo Dark - NEW.svg";
import { GiHamburgerMenu } from "react-icons/gi";

const HamburgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<GiHamburgerMenu size={45} />}
        onClick={onOpen}
        boxSize={["4rem"]}
        size={["4rem"]}
        mr={0}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <List fontSize="1.4rem" spacing={2}>
              <ListItem>
                <Link as={ReactLink} _hover={{ textDecoration: "none" }} to="/">
                  Home
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  as={ReactLink}
                  _hover={{ textDecoration: "none" }}
                  to="/play"
                >
                  Play
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  as={ReactLink}
                  _hover={{ textDecoration: "none" }}
                  to="/contact"
                >
                  Contact Us
                </Link>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const BaseNavbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigateHome = () => navigate("/");
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  if (!isMobile) {
    return (
      <Flex width="100%" mt="1" justify="space-between" px={2} pt={2}>
        <Image
          aria-label="CPDuels logo"
          src={colorMode === "light" ? LightLogo : DarkLogo}
          w="10em"
          h="auto"
          cursor="pointer"
          onClick={navigateHome}
        />
        <HStack
          fontSize="1.5rem"
          fontWeight="bold"
          spacing="1.5em"
          width="fit-content"
        >
          <Link as={ReactLink} _hover={{ textDecoration: "none" }} to="/play">
            Play
          </Link>
          <Link
            as={ReactLink}
            _hover={{ textDecoration: "none" }}
            to="/contact"
          >
            Contact Us
          </Link>
        </HStack>
      </Flex>
    );
  } else {
    return (
      <Flex
        mt="1"
        justify="space-between"
      >
        <Image
          aria-label="CPDuels logo"
          src={colorMode === "light" ? LightLogo : DarkLogo}
          w="10em"
          h="auto"
          cursor="pointer"
          onClick={navigateHome}
        />
        <HamburgerMenu />
      </Flex>
    );
  }
};

const BaseContainer = ({ content }) => {
  return <Box mt={2}>{content}</Box>;
};

const BaseFooter = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      width={["320px", "500px", "800px", "1000px", "1150px"]}
      position="absolute"
      bottom={0}
    >
      <Text fontSize={["sm", "md"]} mb={4} align="center">
        Developed by{" "}
        <Text
          as="span"
          fontWeight="bold"
          color={colorMode === "light" ? "primary.500" : "primary.300"}
        >
          David Chi
        </Text>{" "}
        and{" "}
        <Text
          as="span"
          fontWeight="bold"
          color={colorMode === "light" ? "primary.500" : "primary.300"}
        >
          Jeffrey Li
        </Text>
        <br />
        2022 ChiLi Studios
      </Text>
    </Box>
  );
};

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      position="fixed"
      bottom={["1", "2", "3", "4", "5"]}
      right={["1", "2", "3", "4", "5"]}
      zIndex={1000}
    >
      <IconButton
        variant="outline"
        colorScheme={colorMode === "dark" ? "orange" : "white"}
        boxSize={["2rem", "3rem", "4rem"]}
        size={["2rem", "3rem", "4rem"]}
        icon={
          colorMode === "dark" ? (
            <WiDaySunny size={50} />
          ) : (
            <IoMoon size={50} style={{ transform: "rotate(270deg)" }} />
          )
        }
        onClick={toggleColorMode}
        isRound
      />
    </Box>
  );
};

const BaseLayout = ({ isHomePage, content }) => {
  return (
    <Flex
      minHeight="1000px"
      position="relative"
      justifyContent="center"
      pb="6em"
      overflowX="hidden"
    >
      <Box width={["320px", "500px", "800px", "1000px", "1150px"]} m={0} p={0}>
        <BaseNavbar />
        <BaseContainer content={content} />
        <BaseFooter />
        <ToggleColorMode />
      </Box>
    </Flex>
  );
};

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
