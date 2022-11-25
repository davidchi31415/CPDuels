import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import "./styles.css";
import socket from "../../socket";
import Database, { handleUID } from "../../data";

const ChatBox = ({ id, players, playerNum }) => {
  const [typingIndicator, setTypingIndicator] = useState(null);

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const boxShadow = useColorModeValue("2xl", "none");

  const [emptyMessageError, setEmptyMessageError] = useState(false);
  const messageLengthError = currentMessage.length > 500;

  const [username, setUsername] = useState("");

  useEffect(() => {
    handleUID();
    let uid = localStorage.getItem("uid");
    if (players.length === 1) {
      if (players[0].username === "!GUEST!") setUsername("GUEST");
    } else {
      if (
        players[0].username === "!GUEST!" &&
        players[1].username === "!GUEST!"
      ) {
        if (players[0].uid === uid) setUsername("GUEST1");
        else setUsername("GUEST2");
      } else if (players[playerNum - 1].username === "!GUEST!")
        setUsername("GUEST");
      else setUsername(players[playerNum - 1].username);
    }
  }, [players, playerNum, username]);

  const [sending, setSending] = useState(false);

  const toast = useToast();
  const toastRef = useRef();

  const makeToast = (toastParams) => {
    if (toastRef.current) {
      toast.close(toastRef.current);
      toastRef.current = toast(toastParams);
    } else {
      toastRef.current = toast(toastParams);
    }
  };

  const messagesScroller = useRef(null);

  useEffect(() => {
    if (messagesScroller.current) {
      messagesScroller.current.scrollTop =
        messagesScroller.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (typingIndicator) setTimeout(() => setTypingIndicator(null), 5000);
  }, [typingIndicator]);

  const handleSend = (e) => {
    e.preventDefault();
    setSending(true);
    if (currentMessage === "") {
      setEmptyMessageError(true);
      setSending(false);
      makeToast({
        title: "Error",
        description: "Empty message.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEmptyMessageError(false);
    if (messageLengthError) {
      setSending(false);
      return;
    }
    handleUID();
    let uid = localStorage.getItem("uid");
    setMessages((curr) => [...curr, { author: username, content: currentMessage }]);
    socket.emit("message-send", {
      roomId: id,
      uid: uid,
      message: { author: username, content: currentMessage },
    });
    setCurrentMessage("");
    setSending(false);
  };

  useEffect(() => {
    socket.on("message-receive", ({ roomId, senderUid, message }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (id === roomId && localUid != senderUid) {
        console.log(message);
        setMessages((curr) => [...curr, message]);
        setTypingIndicator(null);
      }
    });
    socket.on("message-send-error", ({ roomId, senderUid, message }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (id === roomId && localUid === senderUid) {
        makeToast({
          title: "Error",
          description: message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
    socket.on("message-typing-receive", ({ roomId, senderUid, author }) => {
      handleUID();
      let localUid = localStorage.getItem("uid");
      if (id === roomId && localUid != senderUid) {
        setTypingIndicator(author);
      }
    });

    return () => {
      socket.off("message-receive");
      socket.off("message-send-error");
      socket.off("message-typing-receive");
    };
  }, []);

  return (
    <Box
      position="relative"
      width="40em"
      height="32em"
      p={5}
      pt={0}
      border="solid 1px"
      borderColor="grey.100"
      rounded="md"
      boxShadow={boxShadow}
    >
      <Box py={2}>
        <Text textStyle="body2Semi">Duel Chat</Text>
        <Text fontSize="0.8rem">visible only to duel participants</Text>
      </Box>
      <Box
        height="18em"
        mt={0}
        border="solid 1px"
        borderColor="grey.100"
        position="relative"
        overflowY="auto"
        ref={messagesScroller}
      >
        {messages.length ? (
          <>
            {messages.map((message, index) => (
              <Box px={2} pt={1} pb={index < messages.length - 1 ? 0 : 1}>
                <Text fontWeight="bold">{message.author}</Text>
                <Text>{message.content}</Text>
                {index < messages.length - 1 ? (
                  <Box
                    mt={1}
                    width="100%"
                    height="1px"
                    backgroundColor="grey.100"
                  ></Box>
                ) : (
                  ""
                )}
              </Box>
            ))}
          </>
        ) : (
          ""
        )}
      </Box>
      <Box className="chat-box-typing-indicator">
        {typingIndicator ? (
          <>
            <Box className="typing-dot"></Box>
            <Box className="typing-dot"></Box>
            <Box className="typing-dot"></Box>
            <span>{typingIndicator} is typing</span>
          </>
        ) : (
          ""
        )}
      </Box>
      <Box position="absolute" bottom={5}>
        <FormControl
          isInvalid={emptyMessageError || messageLengthError}
          position="relative"
        >
          <Textarea
            position="relative"
            width="30em"
            height="5em"
            resize="none"
            pl={2}
            pt={1}
            borderColor="grey.100"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              setEmptyMessageError(false);
              handleUID();
              let uid = localStorage.getItem("uid");
              socket.emit("message-typing-send", {
                roomId: id,
                uid: uid,
                author: username
              });
            }}
          />
          {messageLengthError ? (
            <FormErrorMessage position="absolute" bottom="-1.5em">
              Max Message Length: 500 characters
            </FormErrorMessage>
          ) : emptyMessageError ? (
            <FormErrorMessage position="absolute" bottom="-1.5em">
              Please enter a message.
            </FormErrorMessage>
          ) : (
            ""
          )}
        </FormControl>
        <Button
          position="absolute"
          top={0}
          right="-6em"
          colorScheme="primary"
          loadingText="Sending"
          isLoading={sending}
          width="5em"
          height="5em"
          isDisabled={currentMessage.length === 0}
          onClick={handleSend}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
