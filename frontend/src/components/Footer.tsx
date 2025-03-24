import { Flex, Input, Button, } from '@chakra-ui/react';
import { FooterProps } from '../utils/interfaces';

export default function Footer({ inputMessage, setInputMessage, handleSendMessage }: FooterProps) {
  return (
    <Flex w='100%'>
      <Input 
        placeholder='Type something...' 
        value={inputMessage} 
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </Flex>
  );
}