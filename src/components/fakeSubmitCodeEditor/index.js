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
import languages from "../submitCodeEditor/languages";
import Editor from "../submitCodeEditor/editor";

const FakeSubmitCodeEditor = () => {
  const borderColor = useColorModeValue(
    "rgb(0, 0, 0, 0.5)",
    "rgb(255, 255, 255, 0.5)"
  );
    
  const fillerCode = 
`${`#include <bits/stdc++.h>
using namespace std;

void solve() {}

int main() {
  int t; cin >> t;
  while (t--) {
    solve();
  }
}`}`;

  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      boxShadow="2xl"
      rounded="md"
      px={4}
      py={5}
      width="100%"
      transform="scale(0.75)"
      pointerEvents="none !important"
    >
      <Flex pb={3} gap={1} justify="center" align="flex-end">
        <FormControl minHeight='5.5em' isRequired>
          <FormLabel my="auto">Language:</FormLabel>
          <Select
            borderColor="grey.100"
            w="12em"
            value={73}
            isReadOnly={true}
          >
            <option value={0}></option>
            <option value={73}>GNU G++20 11.2.0 (64 bit, winlibs)</option>
          </Select>
          <FormErrorMessage mt={1}>Pick a language.</FormErrorMessage>
        </FormControl>
        <FormControl minHeight='5.5em' isRequired>
          <FormLabel my="auto">Problem #:</FormLabel>
          <Select
            borderColor="grey.100"
            w="8em"
            value={1}
            isReadOnly={true}
          >
            <option value={0}></option>
            <option value={1}>1</option>
          </Select>
          <FormErrorMessage mt={1}>Pick a problem.</FormErrorMessage>
        </FormControl>
        <FormControl minHeight='5.5em' pt='1.5rem'>
          <InputGroup>
            <FormLabel
              as="label"
              htmlFor='file'
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
              Upload File
            </FormLabel>
            <Input
              id='file'
              px={0}
              opacity="0"
              width="0.1px"
              height="0.1px"
              position="absolute"
              type="file"
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
              p={0}
            />
          </InputGroup>
        </FormControl>
      </Flex>
      <FormControl pt={0} minHeight='28.5em'>
        <FormLabel my="auto">or Enter Your Submission:</FormLabel>
        <Box border="1px solid" borderColor="grey.100">
          <Editor duelPlatform="CF" language={73} providedValue={fillerCode} readOnly={true} />
        </Box>
        <FormErrorMessage mt={1}>Enter code in the box or upload a file.</FormErrorMessage>
      </FormControl>

      <Center mt={1}>
        <Button
          size="md"
          fontSize="lg"
          variant="solid"
          colorScheme="primary"
        >
          Submit
        </Button>
      </Center>
    </Box>
  );
};

export default FakeSubmitCodeEditor;
