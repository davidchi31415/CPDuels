import { Center, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import AnimatedEditor from './animatedEditor';
import './styles.css';

const HomeHeroCode = () => {
  const borderColor = useColorModeValue('grey.900', 'grey.500');
  const { colorMode } = useColorMode();

  return (
    <Center p={0} border='5px solid' rounded="md"
      borderColor={borderColor}
      boxShadow={`1em 1em 0.8em ${(colorMode === 'light') ? 'grey' : 'none'}`}
      pointerEvents='none'
      id="home__hero__code"
    >
      <AnimatedEditor />
    </Center>
  );
}

export default HomeHeroCode;