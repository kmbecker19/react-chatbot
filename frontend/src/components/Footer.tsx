import { Flex, Input, Button, } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex w='100%'>
      <Input placeholder='Type something...' />
      <Button>Send</Button>
    </Flex>
  );
}