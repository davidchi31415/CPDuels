import React from 'react';
import { 
  Center,
  Flex, Spacer,
  Stack,
  Text
} from '@chakra-ui/react';
import BaseLayout from '../components/baseLayout';
import HomeHeroCode from '../components/homeHeroCode';

const HomePage = () => {
  return (
    <BaseLayout content={
      <Flex align="center">
        <Stack width="40vw" mt="7vh" spacing="2">
          <Text textStyle="display2" mb={0}>
            A better way to practice coding
          </Text>
          <Text textStyle="body2" mt={0}>
            Sharpen your programming skills by playing one-on-one live duels, 
            with problems drawn from Leetcode, Codeforces, and more.
          </Text>
        </Stack>
        <Spacer/>
        <Center>
          <HomeHeroCode />
        </Center>
      </Flex>
    } />
  );
}

export default HomePage;