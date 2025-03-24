import { Flex, Heading } from '@chakra-ui/react';

export default function Header() {
  return (
    <Flex w='100%'>
      <Flex flexDir='column' mx={5} >
        <Heading>React Chat App</Heading>
      </Flex>
    </Flex>
  );
}