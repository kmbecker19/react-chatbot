import { useEffect, useRef } from 'react';
import { Flex, Text, Heading, Code, Em, List, Blockquote, Box } from '@chakra-ui/react';
import { MessageList, MarkdownProps } from '../utils/interfaces';
import Markdown from 'react-markdown';
import { Components } from 'react-markdown';

function ChakraMarkdown( { content }: MarkdownProps) {
  const components: Components = {
    h1: ({ node, ...props }) => <Heading {...props} />,
    h2: ({ node, ...props }) => <Heading {...props} />,
    h3: ({ node, ...props }) => <Heading {...props} />,
    p: ({ node, ...props }) => <Text as='p' display='block' whiteSpace='pre-line' {...props} />,
    code: ({ node, children, ...props }) => <Code {...props}>{children}</Code>,
    em: ({ node, ...props }) => <Em {...props} />,
    strong: ({ node, ...props }) => <Em fontWeight='bold' {...props} />,
    br: () => <Box as='br' />,
  }
  return <Markdown components={components}>{content}</Markdown>;
}

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
              <Flex my={1} p={2} bg='blue.400' color='white' minW='3xs' maxW='sm'>
                <Text flexWrap='wrap'>{item.content}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w='100%'>
              <Flex my={1} p={2} bg='gray.200' minW='3xs' maxW='sm'>
                <ChakraMarkdown content={item.content} />
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
}