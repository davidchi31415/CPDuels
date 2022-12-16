import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  IconButton,
  ButtonGroup,
  Text,
  Center,
  VStack,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Skeleton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const ReadyUpDisplay = ({ ready }) => {
  return (
    <Flex direction="column" align="center" gap="1em">
      <Center gap={2}>
        <IconButton
          size="md"
          colorScheme="green"
          variant="solid"
          boxSize="3em"
          disabled={ready}
          icon={<CheckIcon boxSize="2em" />}
        />
        <IconButton
          size="md"
          colorScheme="red"
          boxSize="3em"
          disabled={!ready}
          icon={<CloseIcon boxSize="1.5em" />}
        />
      </Center>
      <Text fontSize="1.5rem">{ready ? 2 : 1}/2</Text>
    </Flex>
  );
};


const TimeDisplay = () => {
  return (
    <Text textAlign="center" textStyle="display2">
      2:00:00
    </Text>
  );
};

const FakeTimeAndJoinDisplay = ({
  inViewport,
  forwardedRef,
  finished,
  onFinished,
}) => {
  const [currentDisplay, setCurrentDisplay] = useState(
    finished ? <TimeDisplay /> : <ReadyUpDisplay ready={false} />
  );

  const [animating, setAnimating] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const animate = async () => {
      setAnimating(true);
      await sleep(1500);
      setCurrentDisplay(<ReadyUpDisplay ready={true} />);
      await sleep(1000);
      setCurrentDisplay(<TimeDisplay />);
      onFinished();
    };
    if (inViewport && !animating && !finished) {
      animate();
    }
  }, [finished, inViewport, animating]);

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );

  return (
    <div ref={forwardedRef}>
      <TableContainer
        border="1px solid"
        borderColor={borderColor}
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        width="22em"
        boxShadow="2xl"
      >
        <Table>
          <Thead>
            <Tr>
              <Th
                textAlign="center"
                fontSize="1.2rem"
                borderColor="grey.500"
                py={2}
              >
                {finished ? "Time Left" : "Ready to Start?"}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px={1} py={1} height="8em">
                <Center height="100%">{currentDisplay}</Center>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FakeTimeAndJoinDisplay;
