import React, { useEffect, useRef } from "react";
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
  Switch,
} from "@chakra-ui/react";
import { WiDaySunny } from "react-icons/wi";
import { IoMoon, IoClose } from "react-icons/io5";
import LightLogo from "../../images/CPDuels Logo Light - NEW.svg";
import DarkLogo from "../../images/CPDuels Logo Dark - NEW.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSwipeable } from "react-swipeable";

const HamburgerMenu = ({ setMenuRef }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setMenuRef(onOpen);
  }, []);

  return (
    <>
      <IconButton
        variant="unstyled"
        icon={<GiHamburgerMenu size={45} />}
        onClick={onOpen}
        boxSize={["4rem"]}
        size={["4rem"]}
        mr={0}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify="space-between">
              <Text textAlign='center' textStyle='body1Semi'>Menu</Text>
              <IconButton
                my='auto'
                variant="unstyled"
                icon={<IoClose size={36} />}
                onClick={onClose}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <List
              fontSize="1.4rem"
              listStylePos="inside"
              pl={0}
              pb={2}
              spacing={2}
              borderBottom="1px solid"
              borderColor="gray"
            >
              <ListItem mx={0}>
                <Link as={ReactLink} _hover={{ textDecoration: "none" }} to="/">
                  Home
                </Link>
              </ListItem>
              <ListItem mx={0}>
                <Link
                  as={ReactLink}
                  _hover={{ textDecoration: "none" }}
                  to="/play"
                >
                  Play
                </Link>
              </ListItem>
              <ListItem mx={0}>
                <Link
                  as={ReactLink}
                  _hover={{ textDecoration: "none" }}
                  to="/contact"
                >
                  Contact Us
                </Link>
              </ListItem>
            </List>
            <Box mt={3}>
              <Text fontSize="1.4rem" as="span" mr={3}>
                {colorMode[0].toUpperCase() + colorMode.substring(1)} Mode
              </Text>
              <Switch
                size="lg"
                colorScheme="primary"
                defaultChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const BaseNavbar = ({ isMobile, setMenuRef }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigateHome = () => navigate("/");

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
          fontWeight="800"
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
      <Flex mt="1" justify="space-between">
        <Image
          aria-label="CPDuels logo"
          src={colorMode === "light" ? LightLogo : DarkLogo}
          w="10em"
          h="auto"
          cursor="pointer"
          onClick={navigateHome}
        />
        <HamburgerMenu setMenuRef={setMenuRef} />
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
    <Flex width="100%" justify="center" pt={5} pb={1}>
      <Text fontSize={["sm", "md"]} mb={4} align="center" mx="auto">
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
    </Flex>
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
        boxSize={["3rem", "4rem"]}
        size={["3rem", "4rem"]}
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

const BaseLayout = ({ content }) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const openMenuRef = useRef(); // Ref for opening menu function
  const swipeObserver = useSwipeable({
    onSwipedLeft: () => {
      if (openMenuRef.current) {
        openMenuRef.current();
      }
    }
  });
  return (
    <Flex minHeight="1000px" justifyContent="center" overflowX="hidden"
      {...swipeObserver}
    >
      <Box width={["312px", "472px", "760px", "984px", "1150px"]} m={0} p={0}>
        <BaseNavbar isMobile={isMobile} setMenuRef={(func) => { openMenuRef.current = func; }} />
        <BaseContainer content={content} />
        <BaseFooter />
        {!isMobile ? <ToggleColorMode /> : ""}
      </Box>
    </Flex>
  );
};

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
