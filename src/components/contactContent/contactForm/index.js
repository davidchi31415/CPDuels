import React, { useEffect, useState, useRef } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Flex,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  Switch,
  Grid,
  GridItem,
  Button,
  Center,
  Text,
  useToast,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import Database, { handleUID } from "../../../data";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("COMMENT");
  const [wantsResponse, setWantsResponse] = useState(false);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const wantsResponseError = wantsResponse && email === "";
  const messageLengthError = message.length > 500;
  const [messageError, setMessageError] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (wantsResponseError || messageLengthError) {
      setSubmitting(false);
      return;
      // }
      // await Database.addDuel(duelData).then((res) => {
      //   if (!res._id) {
      //     setSubmitting(false);
      //     makeToast({
      //       title: "Server Error",
      //       description: res.message,
      //       status: "error",
      //       duration: 9000,
      //       isClosable: true,
      //     });
      //   } else {
      //     makeToast({
      //       title: "Success",
      //       description: "Duel created successfully. Navigating...",
      //       status: "success",
      //       duration: 2000,
      //       isClosable: true,
      //     });
      //     duelID = res._id;
      //     navigate(`/play/${duelID}`);
      //   }
      // });
    }
    if (message === "") {
      setMessageError(true);
      setSubmitting(false);
      return;
    }
    const submissionTime = new Date();
    let res = await Database.addMessage({
      timeSubmitted: submissionTime.toDateString(),
      name: name != "" ? name : "ANONYMOUS",
      email: email != "" ? email : "N/A",
      type: type,
      wantsResponse: wantsResponse ? "YES" : "NO",
      content: message,
    });
    if (res.message) {
      makeToast({
        title: "Error",
        description: res.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      makeToast({
        title: "Success",
        description: "Your message has been sent!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      rowGap={1}
      columnGap={1}
      width="30em"
      height="fit-content"
      px={4}
      py={3}
      justifyItems="center"
    >
      <GridItem colSpan={2}>
        <Center>
          <Text
            textStyle="display2"
            fontSize={["2.4rem", "3rem", "4rem"]}
            lineHeight={["3.2rem", "4.8rem"]}
            maxWidth="90vw"
            mx="auto"
          >
            Talk to Us
          </Text>
        </Center>
      </GridItem>
      <GridItem colSpan={[2, 1]}>
        <Center>
          <FormControl>
            <FormLabel my="auto">Name (optional)</FormLabel>
            <Input
              mt={0}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              borderColor="grey.100"
              width="12em"
              pl={2}
            />
          </FormControl>
        </Center>
      </GridItem>
      <GridItem colSpan={[2, 1]}>
        <Center>
          <FormControl>
            <FormLabel my="auto">Email (optional)</FormLabel>
            <Input
              mt={0}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="grey.100"
              width="12em"
              pl={2}
            />
          </FormControl>
        </Center>
      </GridItem>
      <GridItem colSpan={[2, 1]} paddingLeft={0}>
        <FormControl width="192px" isRequired>
          <FormLabel my="auto">Message Type</FormLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            borderColor="grey.100"
            width="192px"
          >
            <option value="COMMENT">Comment</option>
            <option value="ISSUE">Issue</option>
            <option value="SUGGESTION">Suggestion</option>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem colSpan={[2, 1]} mt={[1, 0]}>
        <Center>
          <FormControl width="200px" isInvalid={wantsResponseError}>
            <FormLabel my="auto" width="fit-content" display="inline-block">
              Want a response?
            </FormLabel>
            <Switch
              my="auto"
              size={["md", "lg"]}
              colorScheme="primary"
              onChange={(e) => setWantsResponse(e.target.checked)}
            />
            {wantsResponseError ? (
              <FormErrorMessage mt={1}>
                You must provide an email for us to contact you.
              </FormErrorMessage>
            ) : (
              <FormHelperText mt={1}>
                We will try our best to get back to you in a timely manner.
              </FormHelperText>
            )}
          </FormControl>
        </Center>
      </GridItem>
      <GridItem colSpan={2} rowSpan={3}>
        <FormControl isInvalid={messageError || messageLengthError} isRequired>
          <Textarea
            mt={1}
            width={["300px", "400px"]}
            height="200px"
            py={1}
            px={2}
            type="text"
            borderColor="grey.100"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setMessageError(false);
            }}
          ></Textarea>
          {messageLengthError ? (
            <FormErrorMessage mt={1}>
              Max Message Length: 500 characters
            </FormErrorMessage>
          ) : messageError ? (
            <FormErrorMessage mt={1}>Please write a message.</FormErrorMessage>
          ) : (
            ""
          )}
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <Center>
          <Button
            onClick={handleSubmit}
            size="md"
            fontSize="lg"
            loadingText="Sending"
            isLoading={submitting}
            variant="solid"
            colorScheme="primary"
          >
            Send
          </Button>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default ContactForm;
