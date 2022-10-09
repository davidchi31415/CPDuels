import { Center, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import AnimatedEditor from './animatedEditor';

const HomeHeroCode = () => {
  const borderColor = useColorModeValue('grey.900', 'grey.100');
  const { colorMode } = useColorMode();

  return (
    <Center p={0} border='5px solid' rounded="md"
      borderColor={borderColor}
      boxShadow={`0.5em 0.3em 0.3em ${(colorMode === 'light') ? 'grey' : 'none'}`}
      pointerEvents='none'
    >
      <AnimatedEditor />
    </Center>
  );
}

export default HomeHeroCode;