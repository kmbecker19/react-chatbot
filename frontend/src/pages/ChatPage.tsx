import { Flex, Heading, Box, Separator } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ChatPage() {
  return (
    <Flex w='100%' h='100vh' justify='center' align='center' border='5px solid red'>
      <Flex w='80%' h='90%' flexDir='column' border='2px solid blue'>
        <Header />
        <Separator />
        {/* Chat components here */}
        <Footer />
      </Flex>
    </Flex>
  );
}