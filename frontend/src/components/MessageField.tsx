import { useEffect, useRef } from 'react';
import { Flex, Text, Heading, Code, Em, List, Box, Blockquote, Link } from '@chakra-ui/react';
import { MessageList, MarkdownProps } from '../utils/interfaces';
import Markdown from 'react-markdown';
import { Components } from 'react-markdown';

function ChakraMarkdown( { content }: MarkdownProps) {
  const components: Components = {
    h1: ({ node, ...props }) => <Heading size='4xl' {...props} />,
    h2: ({ node, ...props }) => <Heading size='3xl' {...props} />,
    h3: ({ node, ...props }) => <Heading size='2xl' {...props} />,
    h4: ({ node, ...props }) => <Heading size='xl' {...props} />,
    h5: ({ node, ...props }) => <Heading size='lg' {...props} />,
    h6: ({ node, ...props }) => <Heading size='md' {...props} />,
    p: ({ node, ...props }) => <Text display='inline' {...props} />,
    code: ({ node, children, ...props }) => <Code fontSize='sm' p={1} {...props}>{children}</Code>,
    em: ({ node, ...props }) => <Em {...props} />,
    strong: ({ node, ...props }) => <Box as='strong' fontWeight='bold' display='inline' {...props} />,
    ul: ({ node, ...props }) => <List.Root as='ul' {...props} />,
    ol: ({ node, ...props }) => <List.Root as='ol' {...props} />,
    li: ({ node, key, ...props }) => <List.Item as='li' key={key} _marker={{ color: 'inherit', fontWeight: 'bold' }} {...props} />,
    blockquote: ({ node, children, cite, ...props }) => (
      <Blockquote.Root px={3} py={1} {...props}>
        <Blockquote.Content cite={cite}>
          {children}
        </Blockquote.Content>
      </Blockquote.Root>
    ),
    a: ({ node, href, children, ...props }) => <Link href={href} {...props}>{children}</Link>,
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
    <Flex w='100%' h='80%' overflowY='scroll' flexDir='column' p={3} gap={6} divideY='1px'>
      {messages.map((item, index) => {
        if (item.role === 'user') {
          return (
            <Flex key={index} w='100%' justify='flex-end'>
              <Flex my={3} py={2} px={3} bg='blue.400' color='white' minW='3xs' maxW='xl' borderRadius='10px'>
                <Text flexWrap='wrap'>{item.content}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w='100%' mx={3}>
              <Flex my={1} p={2} w='80%' flexDir='column' gap={6} justify='center'>
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