import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

export default function AlertPop (props) {
  return (
    <Alert status="error" bg='tomato' maxW='fit-content'>
      <AlertIcon />
      <AlertTitle mr={2}>{props.title}</AlertTitle>
    </Alert>
  );
}