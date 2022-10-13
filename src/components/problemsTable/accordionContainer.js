import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, AccordionProps,
  Box, Center, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  useColorModeValue, useDisclosure, ButtonGroup
} from '@chakra-ui/react';
import SubmitCodeEditor from '../submitCodeEditor';
import socket from '../../socket';
import Database, { handleUID } from '../../data';
import { useNavigate } from 'react-router-dom';

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
            <AccordionPanel pb={4}>
            <Center>
              {problem.content ? problem.content.problemConstraints : 
                <>
                  <div class="time-limit">
                    <div class="property-title">time limit per test</div>2 seconds
                  </div><div class="memory-limit">
                  <div class="property-title">memory limit per test</div>256 megabytes</div>
                  <div class="input-file"><div class="property-title">input</div>standard input</div>
                  <div class="output-file"><div class="property-title">output</div>standard output</div>              }
                </>
              }
            </Center>
            <Box>
              {problem.content ? problem.content.problemStatement : ""}
            </Box>
            <Box>
              {problem.content ? problem.content.problemInput : ""}
            </Box>
            <Box>
              {problem.content ? problem.content.problemOutput : ""}
            </Box>
            <Box>
              {problem.content ? problem.content.samples : ""}
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