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
    <Flex w='100%' h='80%' overflowY='scroll' flexDir='column' p={3}>
      {messages.map((item, index) => {
        if (item.role === 'user') {
          return (
            <Flex key={index} w='100%' justify='flex-end'>
              <Flex my={1} p={2} bg='blue.400' color='white' minW='2xs' maxW='sm'>
                <Text flexWrap='wrap'>{item.content}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w='100%'>
              <Flex my={1} p={2} bg='gray.200' minW='2xs' maxW='sm'>
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
}