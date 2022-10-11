import { 
  Box,
  FormControl, FormErrorMessage, FormLabel, 
  Flex, Center,
  Select, Button, IconButton, 
  Input, InputGroup, InputRightAddon,
  useColorModeValue, useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import languages from './languages';
import Editor from './editor';

const SubmitCodeEditor = () => {
  const borderColor = useColorModeValue('rgb(0, 0, 0, 0.5)', 'rgb(255, 255, 255, 0.5)');
  const [chosenLanguage, setChosenLanguage] = useState('C++');
  const [problemNum, setProblemNum] = useState(0);
  const [problemNumError, setProblemNumError] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState();
  const [fileContent, setFileContent] = useState();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (problemNum === 0) {
      setProblemNumError(true);
      setSubmitting(false);
      return;
    }
    setProblemNumError(false);
  }

  const handleUpload = (e) => {
    setFileUploaded(true);
    setFileContent(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setFileUploaded(false);
    setFileContent();
    setFileName();
    console.log(fileName);
  }

  return (
    <Box border='1px solid' borderColor={borderColor} 
      boxShadow='2xl' rounded='md'
      px={4} py={3} width='100%'
    >
      <Flex pb={3} gap={1} justify='center' align='flex-end'>
        <FormControl isRequired>
          <FormLabel my='auto'>Language:</FormLabel>
          <Select borderColor='grey.100' w='10em'
            value={chosenLanguage}
            onChange={(e) => setChosenLanguage(e.target.value)}
          >
            {
              Object.keys(languages).map(
                languageName => <option value={languageName}>{languageName}</option>
              )
            }
          </Select>
        </FormControl>
        <FormControl isInvalid={problemNumError} isRequired>
          <FormLabel my='auto'>Problem #:</FormLabel>
          <Select borderColor='grey.100' w='6em'
            value={problemNum}
            onChange={(e) => {
              setProblemNum(e.target.value);
              if (e.target.value !== 0) setProblemNumError(false);
            }}
          >
            <option value={0} disabled selected></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Select>
          <FormErrorMessage>Pick a problem.</FormErrorMessage>
        </FormControl>
        <FormControl>
          <InputGroup>
            <FormLabel as='label' htmlFor='file' 
              m={0} padding={0}
              width='12em'
              border='1px solid'
              textAlign='center' fontSize='1.3rem'
              borderColor={borderColor} borderLeftRadius='md'
              cursor='pointer'
            >
              {fileUploaded ? fileName : 'Upload File'}
            </FormLabel>
            <Input id='file' px={0} opacity='0' width='0.1px' height='0.1px' position='absolute' type='file'
              onChange={handleUpload}
            />
            <InputRightAddon children={
              <IconButton icon={<MdDelete />} 
                borderLeftRadius='none' variant='outline' colorScheme='primary'
              />
              }
              onClick={handleDelete}
              p={0}
            />
          </InputGroup>
        </FormControl>
      </Flex>
      <FormControl pt={2}>
        <FormLabel my='auto'>or Enter Your Submission:</FormLabel>
        <Box border='1px solid' borderColor='grey.100'>
          <Editor language={chosenLanguage} />
        </Box>
      </FormControl>
      <Center mt={3}>
        <Button onClick={handleSubmit} size="md" fontSize='lg'
          loadingText="Submitting" isLoading={submitting}
          variant='solid' colorScheme='primary'
        >
          Submit
        </Button>
      </Center>
    </Box>
  );
}

export default SubmitCodeEditor;