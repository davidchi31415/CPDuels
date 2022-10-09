import { Center, useColorMode } from '@chakra-ui/react';
import React from 'react';
import AnimatedEditor from './animatedEditor';

const HomeHeroCode = () => {
  const { colorMode } = useColorMode();

  return (
    <Center p={1} border='1px solid' rounded="md"
      bg={(colorMode === 'light' ? 'grey.900' : 'offWhite')}
      boxShadow={`0.5em 0.3em 0.3em ${(colorMode === 'light') ? 'grey' : 'none'}`}
      pointerEvents='none'
    >
      <AnimatedEditor colorMode={colorMode}/>
    </Center>
  );
}

export default HomeHeroCode;