import { useEffect, useRef } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { MessageList } from '../utils/interfaces';

export default function MessageField({ messages }: MessageList) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  }

  return (
    <Flex w='100%' h='80%' overflowY='scroll' flexDir='column'>
      {messages.map((item, index) => {
        if (item.role === 'user') {
          return (
            <Flex key={index} w='100%' p={2} bg='blue.200' justify='flex-end'>
              <Text color='white'>{item.content}</Text>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w='100%' p={2} bg='gray.100'>
              <Text>{item.content}</Text>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
}