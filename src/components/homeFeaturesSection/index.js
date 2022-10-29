import React from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} fontSize="1.2rem" color="offWhite">{title}</Text>
      <Text color="offWhite">{text}</Text>
    </Stack>
  );
};

const HomeFeaturesSection = () => {
  return (
    <Box bg="primary.400" borderRightRadius="3rem" marginLeft="-10em" paddingLeft="10em"pt={5}>
      <Text color="offWhite" textStyle="body2" align="center" position="relative">
        Whatever your goals, CPDuels was built for you.
      </Text>
      <Box p={4} pt={6}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Interview Preparation"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Competitive Programming"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Having Fun"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomeFeaturesSection;
