import React from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex, Spacer,
  HStack,
  Image,
  Text,
  IconButton,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { WiDaySunny } from 'react-icons/wi';
import { IoMoon } from 'react-icons/io5';
import LightLogo from '../../images/logo_light.png';
import DarkLogo from '../../images/logo_dark.png';
import { MathJax } from 'better-react-mathjax';

const BaseNavbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } =  useColorMode();

  return (
    <Flex mt="1" justify='space-between'> 
      <Image 
          aria-label="CPDuels logo" 
          src={(colorMode == "light") ? LightLogo : DarkLogo} 
          w="10em" 
          h="auto" 
          cursor="pointer"
          onClick={() => navigate("/")} 
      />
      <Spacer/>
      <HStack fontSize="1.5rem" fontWeight="bold" spacing="1.5em" width='fit-content'>
        <Link as={ReactLink} _hover={{textDecoration: "none"}} to="/play">Play</Link>
        <Link as={ReactLink} _hover={{textDecoration: "none"}} to="/tutorial">Tutorial</Link>
        <Link as={ReactLink} _hover={{textDecoration: "none"}} to="/contact">Contact</Link>
      </HStack>
    </Flex>
  );
}

const BaseContainer = ({ content }) => {
  return (
    <Box mt={2}>
      {content}
    </Box>
  );
}

const BaseFooter = () => {
  const { colorMode, toggleColorMode } =  useColorMode();

  return (  
    <Box width='1150px' position="absolute" bottom={0}>
      <Text fontSize="md" mb={1} align="center">
        2022 CPDuels.com<br/>
        Developed by <Text as="span" fontWeight="bold" color={(colorMode === "light") ? "primary.500" : "primary.300"}>David Chi</Text> and <Text as="span" fontWeight="bold" color={(colorMode === "light") ? "primary.500" : "primary.300"}>Jeffrey Li</Text>
      </Text>
    </Box>
  );
}

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } =  useColorMode();
  return (
    <Box position='fixed'
      bottom={['1', '2', '3', '4', '5']}
      right={['1', '2', '3', '4', '5']}
      zIndex={2}
    >
      <IconButton 
        variant='outline'
        colorScheme={(colorMode==='dark') ? 'orange' : 'white'}
        boxSize={["2rem", "3rem", "4rem"]}
        size={["2rem", "3rem", "4rem"]}
        icon={(colorMode==='dark') ? <WiDaySunny size={50}/> : <IoMoon size={50} style={{ transform: 'rotate(270deg)' }}/>}
        onClick={() => toggleColorMode()}
        isRound
      />
    </Box>
  );
}

const BaseLayout = ({ content }) => {
  return (
    <Flex minHeight="1000px" position="relative" justifyContent="center" pb="6em">
      <Box width="1150px" m={0} p={0}>
        <BaseNavbar />
        <MathJax><BaseContainer content={content} /></MathJax>
        <BaseFooter />
        <ToggleColorMode />
      </Box>
    </Flex>
  );
}

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
