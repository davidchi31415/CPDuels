import React, { useEffect, useState, useRef } from "react";
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

const Banner = ({ setShowBanner }) => {
  return (
    <Flex mx="calc(-50vw)" backgroundColor="red" height="2.5em" justify="center" align="center">
      <Text color="offWhite" fontSize="1.1rem"><b>Site Under Development</b>: AtCoder coming soon!</Text>
      <IconButton
        my="auto"
        variant="unstyled"
        icon={<IoClose size={24} />}
        onClick={() => {
          localStorage.setItem("atcoderBannerShown", true);
          setShowBanner(false);
        }}
        position="absolute"
        right="0.5em"
      />    
    </Flex>
  );
}

const HamburgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

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

const MobileBaseNavbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigateHome = () => navigate("/");

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
      <HamburgerMenu />
    </Flex>
  );
};

const BaseNavbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigateHome = () => navigate("/");

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
        <Link as={ReactLink} _hover={{ textDecoration: "none" }} to="/contact">
          Contact Us
        </Link>
      </HStack>
    </Flex>
  );
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
          cursor="pointer"
          onClick={() => navigate("/contact")}
        >
          David Chi
        </Text>{" "}
        and{" "}
        <Text
          as="span"
          fontWeight="bold"
          color={colorMode === "light" ? "primary.500" : "primary.300"}
          cursor="pointer"
          onClick={() => navigate("/contact")}
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

  const bannerShown = localStorage.getItem("atcoderBannerShown");
  const [showBanner, setShowBanner] = useState(bannerShown ? false : true);

  return (
    <Flex justifyContent="center" overflowX="hidden" overflowY="hidden">
      {console.count("Base Layout")}
      <Box width={["312px", "472px", "760px", "984px", "1150px"]} m={0} p={0}>
        { showBanner ? <Banner setShowBanner={setShowBanner} /> : "" }
        {isMobile ? <MobileBaseNavbar /> : <BaseNavbar />}
        <BaseContainer content={content} />
        <BaseFooter />
        {!isMobile ? <ToggleColorMode /> : ""}
      </Box>
    </Flex>
  );
};

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
