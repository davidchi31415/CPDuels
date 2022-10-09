import { Center, useColorMode } from '@chakra-ui/react';
import React from 'react';
import AnimatedEditor from './animatedEditor';

const HomeHeroCode = () => {
  const { colorMode } = useColorMode();

  return (
    <Center p={1} border='1px solid' rounded="md" bg={(colorMode === 'light' ? 'grey.500' : 'offWhite')}>
      <AnimatedEditor colorMode={colorMode}/>
    </Center>
  );
}

export default HomeHeroCode;