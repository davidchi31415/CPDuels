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
import { HiMenuAlt4 } from "react-icons/hi";

const HamburgerMenu = ({ setMenuRefs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setMenuRefs(onOpen, onClose);
  }, []);

  return (
    <>
      <IconButton
        variant="unstyled"
        icon={<HiMenuAlt4 size={45} />}
        onClick={onOpen}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justify="space-between">
              <Text textAlign="center" textStyle="body1Semi">
                Menu
              </Text>
              <IconButton
                my="auto"
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
                defaultChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const BaseNavbar = ({ isMobile, setMenuRefs }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigateHome = () => navigate("/");

  if (!isMobile) {
    return (
      <Flex
        width="100%"
        mt="1"
        justify="space-between"
        align="center"
        px={2}
        pt={2}
      >
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
      <Flex justify="space-between" align="center" mt={1} mx={0}>
        <Image
          aria-label="CPDuels logo"
          src={colorMode === "light" ? LightLogo : DarkLogo}
          w="10em"
          h="auto"
          mt={1}
          cursor="pointer"
          onClick={navigateHome}
        />
        <HamburgerMenu setMenuRefs={setMenuRefs} />
      </Flex>
    );
  }
};

const BaseContainer = ({ content }) => {
  return <Box mt={2}>{content}</Box>;
};

const BaseFooter = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex width="100%" justify="center" pt={5} pb={1}>
      <Text fontSize={["sm", "md"]} mb={4} align="center" mx="auto">
        Developed by{" "}
        <Text
          as="span"
          fontWeight="bold"
          color={colorMode === "light" ? "primary.500" : "primary.300"}
          cursor="pointer" onClick={() => navigate("/contact")}
        >
          David Chi
        </Text>{" "}
        and{" "}
        <Text
          as="span"
          fontWeight="bold"
          color={colorMode === "light" ? "primary.500" : "primary.300"}
          cursor="pointer" onClick={() => navigate("/contact")}
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
  const mobileMenuOpen = useRef();
  const mobileMenuClose = useRef();
  const touchStart = useRef();
  const touchEnd = useRef();

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 125;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < minSwipeDistance;
    if (isLeftSwipe) {
      if (mobileMenuOpen.current !== null) mobileMenuOpen.current();
    } else if (isRightSwipe) {
      console.log("Right Swipe");
      if (mobileMenuClose.current !== null) mobileMenuClose.current();
    }
  };

  return (
    <Flex
      minHeight="1000px"
      justifyContent="center"
      overflowX="hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      sx={{ "-webkit-text-size-adjust": "100%" }}
    >
      <Box width={["312px", "472px", "760px", "984px", "1150px"]} m={0} p={0}>
        <BaseNavbar
          isMobile={isMobile}
          setMenuRefs={(onOpen, onClose) => {
            mobileMenuOpen.current = onOpen;
            mobileMenuClose.current = onClose;
          }}
        />
        <BaseContainer content={content} />
        <BaseFooter />
        {!isMobile ? <ToggleColorMode /> : ""}
      </Box>
    </Flex>
  );
};

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
