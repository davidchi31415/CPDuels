import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, AccordionProps,
  Box, Center, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  useColorModeValue, useDisclosure, ButtonGroup, Flex, Text
} from '@chakra-ui/react';
import SubmitCodeEditor from '../submitCodeEditor';
import socket from '../../socket';
import Database, { handleUID } from '../../data';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import './cfStyles.css';
import { MathJax } from 'better-react-mathjax';

const AccordionContainer = ({ id, duelStatus, playerNum }) => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getProblems = async () => {
      let duel = await Database.getDuelById(id);
      setProblems(duel.problems);
    }
    getProblems();

    socket.on('time-left', async () => {
      await getProblems();
    })
    
    socket.on('problem-change', async ({ roomId }) => {
      if (roomId === id) {
        await getProblems();
      }
    });

    return () => {
      socket.off('time-left');
      socket.off('problem-change');
    }
  }, []);

  const borderColor = useColorModeValue('rgb(0, 0, 0, 0.5)', 'rgb(255, 255, 255, 0.5)');
  const selectedRowColor = useColorModeValue('primary.300', 'primary.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    problems?.length ?
    <Accordion onChange={(index) => setSelectedProblem(index+1)} allowToggle
      boxShadow='2xl'
    >
      {
        problems.map(
          (problem, index) => 
          <AccordionItem key={problem._id} borderColor={borderColor} border='1px solid'>
            <h2>
              <AccordionButton bg={(index === selectedProblem-1) ? selectedRowColor : ''}
                _hover={(index === selectedProblem-1) ? {bg: selectedRowColor} : {}}
              >
                <Box flex='2' textAlign='left'>
                  {index+1}. <b>{problem.name}</b>
                </Box>
                <Box flex='1' textAlign='center'>
                  <b>Rated:</b> {problem.rating}, <b>Points:</b> {problem.points}
                </Box>
                <AccordionIcon/>
              </AccordionButton>
            </h2>
            <AccordionPanel p={4}>
              {
                console.log(problem.content)
              }
              {problem.content.problemConstraints ? <Flex justify='space-between'>{parse(problem.content.problemConstraints)}</Flex> : ""}
            <Box mt={2} className='problem-statement'>
              <Text fontWeight='bold' fontSize='1.2rem'>Problem Statement</Text>
              {problem.content.problemStatement ? <MathJax>{parse(problem.content.problemStatement)}</MathJax> : ""}
            </Box>
            <Box mt={2} className='problem-input-specifications'>
              <Text fontWeight='bold' fontSize='1.2rem'>Input</Text>
              {problem.content.problemInput ? <MathJax>{parse(problem.content.problemInput)}</MathJax> : ""}
            </Box>
            <Box mt={2} className='problem-output-specifications'>
              <Text fontWeight='bold' fontSize='1.2rem'>Output</Text>
              {problem.content.problemOutput ? <MathJax>{parse(problem.content.problemOutput)}</MathJax> : ""}
            </Box>
            <Box mt={2} className='problem-sample-test-cases'>
              <Text fontWeight='bold' fontSize='1.2rem'>Sample Test Cases</Text>
              {problem.content.samples ? parse(problem.content.samples) : ""}
            </Box>
            <Center pt={3}>
                <Button onClick={onOpen} size="md" fontSize='lg'
                  variant='solid' colorScheme='primary'
                >
                  Submit Your Answer
                </Button>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        )
      }
      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Your Answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody width='750px'>
            <SubmitCodeEditor isPopup={true} problemChosen={selectedProblem} numProblems={problems.length} />
          </ModalBody>
          <ModalFooter justifyContent='center'>
            <ButtonGroup spacing={0}>
              <Button colorScheme='primary' mr={3}>
                Submit
              </Button>
              <Button variant='outline' colorScheme='primary'
                onClick={onClose}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Accordion>
    : <p>Problems will be generated when the duel starts.</p>
  );
}

export default AccordionContainer;