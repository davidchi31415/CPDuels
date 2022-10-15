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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import languages from "./languages";
import Editor from "./editor";
import socket from "../../socket";
import { handleUID } from '../../data';

const SubmitCodeEditor = ({
  editorId,
  duelId,
  isPopup,
  problemChosen,
  numProblems,
}) => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
  const [chosenLanguage, setChosenLanguage] = useState("C++");
  const [problemNum, setProblemNum] = useState(
    problemChosen ? problemChosen : 0
  );
  const [problemNumError, setProblemNumError] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const fileName = useRef("");
  const fileContent = useRef("");
  const code = useRef("");
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
    if (problemNum === 0) {
      setProblemNumError(true);
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
    handleUID();
    let uid = localStorage.getItem('uid');
    if (fileContent.current) {
      socket.emit("submit-problem", {
        roomId: duelId,
        uid: uid,
        submission: {
          number: problemNum,
          content: fileContent.current,
        },
      });
    } else if (code.current) {
      socket.emit("submit-problem", {
        roomId: duelId,
        uid: uid,
        submission: {
          number: problemNum,
          content: code.current,
        },
      });
    } else {
      setSubmitting(false);
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
    socket.on("problem-submitted-success", ({ roomId, uid }) => {
      handleUID();
      let localUid = localStorage.getItem('uid');  
      if (roomId === duelId && uid === localUid && submitting) {
        setSubmitting(false);
        makeToast({
          title: "Submitted Successfully",
          description: "Now wait for the verdict :)",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    });

    socket.on("problem-submitted-error", ({ roomId, uid, message }) => {
      handleUID();
      let localUid = localStorage.getItem('uid');
      if (roomId === duelId && uid === localUid && submitting) {
        setSubmitting(false);
        makeToast({
          title: "Submission Error",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      } 
    })

    return () => {
      socket.off("problem-submitted-success");
      socket.off("problem-submitted-error");
    };
  }, [submitting]);

  const handleUpload = (e) => {
    setFileUploaded(true);
    let file = e.target.files[0];
    console.log(file);
    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      fileContent.current = event.target.result;
    };
    fileReader.onerror = (error) => {
      console.log("Error uploading file: " + error);
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
  };

  return (
    <Box
      border={!isPopup ? "1px solid" : "none"}
      borderColor={borderColor}
      boxShadow={!isPopup ? "2xl" : "none"}
      rounded="md"
      px={!isPopup ? 4 : 0}
      py={!isPopup ? 3 : 0}
      width="100%"
    >
      {isPopup ? console.count("counter") : ""}
      <Flex pb={3} gap={1} justify="center" align="flex-end">
        <FormControl minHeight='5.5em' isRequired>
          <FormLabel my="auto">Language:</FormLabel>
          <Select
            borderColor="grey.100"
            w="10em"
            value={chosenLanguage}
            onChange={(e) => setChosenLanguage(e.target.value)}
          >
            {Object.keys(languages).map((languageName) => (
              <option value={languageName}>{languageName}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl minHeight='5.5em' isInvalid={problemNumError} isRequired>
          <FormLabel my="auto">Problem #:</FormLabel>
          <Select
            borderColor="grey.100"
            w="6em"
            value={problemNum}
            onChange={(e) => {
              setProblemNum(e.target.value);
              if (e.target.value !== 0) setProblemNumError(false);
            }}
          >
            <option value={0} disabled></option>
            {[...Array(numProblems).keys()].map((num) => (
              <option value={num + 1}>{num + 1}</option>
            ))}
          </Select>
          <FormErrorMessage mt={1}>Pick a problem.</FormErrorMessage>
        </FormControl>
        <FormControl minHeight='5.5em' pt='1.5rem'>
          <InputGroup>
            <FormLabel
              as="label"
              htmlFor={`${editorId} file`}
              m={0}
              py='auto'
              minHeight='2rem'
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
      <FormControl pt={0}>
        <FormLabel my="auto">or Enter Your Submission:</FormLabel>
        <Box border="1px solid" borderColor="grey.100">
          <Editor key={editorId} language={chosenLanguage} onSetCode={handleCode} />
        </Box>
      </FormControl>

      <Center mt={3}>
        <Button
          id={editorId}
          onClick={handleSubmit}
          size="md"
          fontSize="lg"
          loadingText="Submitting"
          isLoading={submitting}
          variant="solid"
          colorScheme="primary"
        >
          Submit
        </Button>
      </Center>
    </Box>
  );
};

export default SubmitCodeEditor;
