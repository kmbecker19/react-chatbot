import { Flex, Heading, Text } from '@chakra-ui/react';

export default function Header() {
  return (
    <Flex w='100%'>
      <Flex flexDir='column' mx={5} justify='center'>
        <Heading size='2xl'>React Chat App</Heading>
        <Text color='green.500'>Online</Text>
      </Flex>
    </Flex>
  );
}