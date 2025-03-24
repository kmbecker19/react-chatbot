import { Flex, Input, Button, } from '@chakra-ui/react';
import { FooterProps } from '../utils/interfaces';

export default function Footer({ inputMessage, setInputMessage, handleSendMessage }: FooterProps) {
  return (
    <Flex w='100%'>
      <Input m={1}
        placeholder='Type something...' 
        value={inputMessage} 
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
        px={1}
        maxW='90%'
      />
      <Button w='80px' m={1} bg='blue.500' onClick={handleSendMessage} disabled={!inputMessage.trim().length}>Send</Button>
    </Flex>
  );
}