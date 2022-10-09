import React from 'react';
import { 
  Center,
  Flex, Spacer,
  Stack,
  Text,
  ButtonGroup, Button
} from '@chakra-ui/react';
import BaseLayout from '../components/baseLayout';
import HomeHeroCode from '../components/homeHeroCode';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <BaseLayout content={
      <Flex align="center" pt={5}>
        <Stack width="35em" spacing="2">
          <Text textStyle="display2" mb={0}>
            A better way to practice coding
          </Text>
          <Text textStyle="body2" mt={0}>
            Sharpen your programming skills by playing one-on-one live duels, 
            with problems drawn from Leetcode, Codeforces, and more.
          </Text>
          <ButtonGroup pt={1}>
            <Button fontSize='lg' onClick={() => navigate('/play')} _hover={{bg: 'primary.300'}}>
              Play for Free
            </Button>
            <Button variant="outline" fontSize='lg' onClick={() => navigate('/info')}>
              More Info
            </Button>
          </ButtonGroup>
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