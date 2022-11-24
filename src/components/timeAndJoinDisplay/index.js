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
  Skeleton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import Database, { handleUID } from "../../data";
import socket from "../../socket";
import { MdContentCopy } from "react-icons/md";

const JoinDisplay = ({ id, playerNum }) => {
  const [username, setUsername] = useState();
  const [joining, setJoining] = useState(false);
  const [joiningGuest, setJoiningGuest] = useState(false);
  const toastRef = useRef();
  const toast = useToast();
  const link = `https://www.cpduels.com/play/${id}`;

  const handleJoin = (e) => {
    e.preventDefault();
    setJoining(true);
    handleUID();
    if (!username) {
      makeToast({
        title: "Error",
        description: "Either enter username or join as guest.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setJoining(false);
      return;
    }
    let uid = localStorage.getItem("uid");
    socket.emit("join-duel", {
      roomId: id,
      username: username,
      uid: uid,
    });
  };

  const handleJoinGuest = (e) => {
    e.preventDefault();
    setJoiningGuest(true);
    handleUID();
    let uid = localStorage.getItem("uid");
    socket.emit("join-duel", { roomId: id, username: "!GUEST!", uid: uid });
  };

  useEffect(() => {
    socket.on("join-duel-error", ({ message }) => {
      setJoining(false);
      makeToast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });

    return () => {
      socket.off("join-duel-error");
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    makeToast({
      title: "Copied!",
      description: "The link is now in your clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const makeToast = (toastParams) => {
    if (toastRef.current) {
      toast.close(toastRef.current);
    }
    toastRef.current = toast(toastParams);
  };

  return playerNum ? (
    <VStack>
      <Text my={0} height="100%">
        Wait for someone to join, or invite them:
      </Text>
      <InputGroup>
        <Input
          type="text"
          value={`https://www.cpduels.com/play/${id}`}
          size="md"
          textOverflow="ellipsis"
          readOnly
          borderColor="grey.100"
          variant="outline"
        />
        <InputRightElement>
          <IconButton
            variant="outline"
            borderColor="grey.100"
            icon={<MdContentCopy />}
            onClick={copyToClipboard}
          />
        </InputRightElement>
      </InputGroup>
    </VStack>
  ) : (
    <VStack height="100%">
      <FormControl mx="auto" width="fit-content">
        <FormLabel my="auto">Username (optional)</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleJoin(e);
          }}
          borderColor="grey.100"
          width="16em"
          mt={1}
        />
      </FormControl>
      <ButtonGroup>
        <Button
          onClick={handleJoin}
          size="md"
          loadingText="Joining"
          isLoading={joining}
          colorScheme="primary"
          variant="solid"
        >
          Join
        </Button>
        <Button
          onClick={handleJoinGuest}
          size="md"
          loadingText="Joining"
          isLoading={joiningGuest}
          colorScheme="primary"
          variant="outline"
        >
          Join as Guest
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

const StartDisplay = ({ id, playerNum }) => {
  const [starting, setStarting] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    setStarting(true);
    handleUID();
    let uid = localStorage.getItem("uid");
    socket.emit("start-duel", { roomId: id, uid: uid });
  };

  return playerNum !== null ? (
    <Center>
      <Button
        onClick={handleStart}
        size="md"
        loadingText="Starting"
        isLoading={starting}
        colorScheme="primary"
        variant="solid"
      >
        Start Duel
      </Button>
    </Center>
  ) : (
    <Text height="100%">Duel is full.</Text>
  );
};

const TimeDisplay = ({ id }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    socket.on("time-left", ({ roomId, timeLeft }) => {
      if (roomId === id && !Number.isNaN(timeLeft)) {
        setHours(Math.floor(timeLeft / 3600));
        setMinutes(Math.floor(timeLeft / 60) % 60);
        setSeconds(timeLeft % 60);
      }
    });

    return () => {
      socket.off("time-left");
    };
  }, []);

  return (
    <Text textAlign="center" textStyle="display2">
      {`${
        `${hours}`.padStart(2, "0") +
        ":" +
        `${minutes}`.padStart(2, "0") +
        ":" +
        `${seconds}`.padStart(2, "0")
      }`}
    </Text>
  );
};

const ResultDisplay = ({ id }) => {
  const [result, setResult] = useState();
  const [largeText, setLargeText] = useState(true);

  useEffect(() => {
    const getResult = async () => {
      let duel = await Database.getDuelById(id);
      let res = duel.result;
      if (res) {
        if (res[0] === "TIE") setResult("TIE");
        else if (res[0] === "ABORTED") setResult("ABORTED");
        else if (res[0] === "RESIGNED") {
          setResult(
            <>
              {`${res[1]} WINS BY`}
              <br />
              {`RESIGNATION`}
            </>
          ); // Player who won, not the one who resigned
          setLargeText(false);
        } else {
          setResult(`${res[1]} WINS!`);
          setLargeText(false);
        }
      }
    };
    getResult();
  }, []);

  return (
    <Center>
      <Text textAlign="center" textStyle={largeText ? "display2" : "body2Semi"}>
        {result}
      </Text>
    </Center>
  );
};

const TimeAndJoinDisplay = ({ id, duelStatus, playerNum }) => {
  const [title, setTitle] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (duelStatus === "READY") {
      setTitle(playerNum !== null ? "Ready to Start?" : "Duel Full");
      setCurrentDisplay(<StartDisplay id={id} playerNum={playerNum} />);
    } else if (duelStatus === "ONGOING") {
      setTitle("Time Left");
      setCurrentDisplay(<TimeDisplay id={id} />);
    } else if (duelStatus === "FINISHED" || duelStatus === "ABORTED") {
      setTitle("Result");
      setCurrentDisplay(<ResultDisplay id={id} />);
    } else {
      setTitle(playerNum !== null ? "Wait" : "Join");
      setCurrentDisplay(<JoinDisplay id={id} playerNum={playerNum} />);
    }
    if (duelStatus !== "") setLoading(false);
  }, [duelStatus, playerNum]);

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );

  return (
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
              {title}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Skeleton height="8em">
                <Td px={1} py={1} height="8em">
                  {currentDisplay}
                </Td>
              </Skeleton>
            </Tr>
          ) : (
            <Tr>
              <Td px={1} py={1} height="8em">
                {currentDisplay}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TimeAndJoinDisplay;
