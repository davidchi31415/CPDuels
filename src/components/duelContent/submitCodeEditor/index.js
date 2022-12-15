import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  Center,
  Select,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import languages, { codes_to_snippets, languages_to_codes } from "./languages";
import Editor from "./editor";
import socket from "../../../socket";
import { getUID } from "../../../data";

const SubmitCodeEditor = ({
  duelStatus,
  playerNum,
  duelPlatform,
  editorId,
  duelId,
  isPopup,
  problemChosen,
  numProblems,
  problems,
  problemSubmitReceived,
  onProblemSubmitReceived,
}) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [chosenLanguage, setChosenLanguage] = useState(0);
  const [problemNum, setProblemNum] = useState(
    problemChosen ? problemChosen : 0
  );
  const [chosenLanguageError, setChosenLanguageError] = useState(false);
  const [problemNumError, setProblemNumError] = useState(false);
  const [editorFileError, setEditorFileError] = useState(false); // when neither editor nor file are filled
  const [fileUploaded, setFileUploaded] = useState(false);
  const fileName = useRef("");
  const fileContent = useRef("");
  const [lastSubmissionTime, setLastSubmissionTime] = useState();
  const code = useRef();
  const [chosenSnippet, setChosenSnippet] = useState();

  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!chosenLanguage) {
      setChosenLanguageError(true);
    }
    if (!problemNum) {
      setProblemNumError(true);
    }
    if (!chosenLanguage || !problemNum) {
      setSubmitting(false);
      makeToast({
        title: "Submission Error",
        description: "Invalid parameters",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setProblemNumError(false);
    if (lastSubmissionTime) {
      let diff = Date.now() - lastSubmissionTime;
      if (diff < 10000) {
        makeToast({
          title: "Rate Limit",
          description: "Please wait 10 seconds between submissions.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setSubmitting(false);
        return;
      }
    }
    setLastSubmissionTime(Date.now());
    let uid = getUID();
    if (fileContent.current) {
      socket.emit("submit-problem", {
        roomId: duelId,
        uid: uid,
        submission: {
          languageCode: chosenLanguage,
          number: problemNum,
          content: fileContent.current,
        },
      });
    } else if (code.current) {
      socket.emit("submit-problem", {
        roomId: duelId,
        uid: uid,
        submission: {
          languageCode: chosenLanguage,
          number: problemNum,
          content: code.current,
        },
      });
    } else {
      setSubmitting(false);
      setEditorFileError(true);
      makeToast({
        title: "Submission Error",
        description: "Either upload a file or write your code in the editor",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (duelPlatform === "LC" && problemNum && problems?.length && Object.keys(codes_to_snippets).includes(chosenLanguage)) {
      let snippet;
      try {
        snippet = problems[problemNum-1]?.content?.codeSnippets[codes_to_snippets[chosenLanguage]]?.code;
        setChosenSnippet(snippet);
      } catch(err) {
        setChosenSnippet("");
      }
    }
  }, [problems, problemNum, chosenLanguage, duelPlatform]);

  useEffect(() => {
    if (problemSubmitReceived) {
      setSubmitting(false);
      onProblemSubmitReceived();
    }
  }, [problemSubmitReceived]);

  const handleUpload = (e) => {
    setFileUploaded(true);
    setEditorFileError(false);
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      fileContent.current = event.target.result;
    };
    fileReader.readAsText(file);
    fileName.current = file.name;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setFileUploaded(false);
    fileContent.current = "";
    fileName.current = "";
  };

  const handleCode = (newCode) => {
    code.current = newCode;
    setEditorFileError(false);
  };

  return (
    <Box
      border={!isPopup ? "1px solid" : "none"}
      borderColor={borderColor}
      boxShadow={!isPopup ? "2xl" : "none"}
      rounded="md"
      px={!isPopup ? 4 : 0}
      py={!isPopup ? 5 : 2}
      width="100%"
    >
      {isPopup ? <Text mb={1}>Code is <b>not saved</b> upon exiting modal, refreshing page, or switching languages.</Text>
      : <Text mb={1}>Code is <b>not saved</b> upon refreshing page or switching languages.</Text>}
      <Flex pb={3} gap={1} justify="center" align="flex-end">
        <FormControl
          minHeight="5.5em"
          isInvalid={chosenLanguageError}
          isRequired
        >
          <FormLabel my="auto">Language:</FormLabel>
          <Select
            borderColor="grey.100"
            w={isPopup ? "10em" : "12em"}
            value={chosenLanguage}
            onChange={(e) => {
              if (duelPlatform === "CF") {
                setChosenLanguage(parseInt(e.target.value));
                if (parseInt(e.target.value)) setChosenLanguageError(false);
              } else if (duelPlatform === "LC") {
                console.log(e.target.value);
                setChosenLanguage(e.target.value);
                if (e.target.value) setChosenLanguageError(false);
              } else {
                // AtCoder
              }
            }}
          >
            <option value={0}></option>
            {duelPlatform && duelPlatform in languages
              ? Object.keys(languages_to_codes[duelPlatform]).map(
                  (languageName) => (
                    <option
                      value={languages_to_codes[duelPlatform][languageName]}
                    >
                      {languageName}
                    </option>
                  )
                )
              : ""}
          </Select>
          <FormErrorMessage mt={1}>Pick a language.</FormErrorMessage>
        </FormControl>
        <FormControl minHeight="5.5em" isInvalid={problemNumError} isRequired>
          <FormLabel my="auto">Problem #:</FormLabel>
          <Select
            borderColor="grey.100"
            w="7em"
            value={problemChosen}
            onChange={(e) => {
              setProblemNum(parseInt(e.target.value));
              if (parseInt(e.target.value) !== 0) setProblemNumError(false);
            }}
          >
            <option value={0}></option>
            {[...Array(numProblems).keys()].map((num) => (
              <option value={num + 1}>{num + 1}</option>
            ))}
          </Select>
          <FormErrorMessage mt={1}>Pick a problem.</FormErrorMessage>
        </FormControl>
        <FormControl minHeight="5.5em" pt="1.5rem" isInvalid={editorFileError}>
          <InputGroup>
            <FormLabel
              as="label"
              htmlFor={`${editorId} file`}
              m={0}
              py="auto"
              minHeight="2rem"
              width="12em"
              border="1px solid"
              textAlign="center"
              fontSize="1.3rem"
              borderColor={borderColor}
              borderLeftRadius="md"
              cursor="pointer"
            >
              {fileUploaded ? fileName.current : "Upload File"}
            </FormLabel>
            <Input
              id={`${editorId} file`}
              px={0}
              opacity="0"
              width="0.1px"
              height="0.1px"
              position="absolute"
              type="file"
              onChange={handleUpload}
            />
            <InputRightAddon
              children={
                <IconButton
                  icon={<MdDelete />}
                  borderLeftRadius="none"
                  variant="outline"
                  colorScheme="primary"
                />
              }
              onClick={handleDelete}
              p={0}
            />
          </InputGroup>
        </FormControl>
      </Flex>
      <FormControl pt={0} minHeight="28.5em" isInvalid={editorFileError}>
        <FormLabel my="auto">or Enter Your Submission:</FormLabel>
        <Box border="1px solid" borderColor="grey.100">
          <Editor
            key={editorId}
            duelPlatform={duelPlatform ? duelPlatform : ""}
            languageCode={chosenLanguage}
            onSetCode={handleCode}
            providedValue={chosenSnippet}
          />
        </Box>
        <FormErrorMessage mt={1}>
          Enter code in the box or upload a file.
        </FormErrorMessage>
      </FormControl>

      <Center mt={1}>
        <Button
          id={editorId}
          onClick={handleSubmit}
          size="md"
          fontSize="lg"
          loadingText="Submitting"
          isLoading={submitting}
          variant="solid"
          colorScheme="primary"
          isDisabled={duelStatus !== "ONGOING"}
        >
          Submit
        </Button>
      </Center>
    </Box>
  );
};

export default SubmitCodeEditor;
