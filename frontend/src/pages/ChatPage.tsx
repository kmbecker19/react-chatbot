import { useState, } from 'react';
import { Flex, Separator } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MessageField from '../components/MessageField';


export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "computer", content: "Hi, My Name is HoneyChat" },
    { role: "user", content: "Hey there" },
    { role: "user", content: "Hi, I'm Kyle." },
    {
      role: "computer",
      content: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!!inputMessage.trim().length) {
      const data = inputMessage;

      // Add user message to message list
      setMessages((old) => [...old, { role: 'user', content: data }]);
      setInputMessage("");

      // Echo user message with computer message
      // TODO: Implement Query chatbot here
      setTimeout(() => {
        setMessages((old) => [...old, { role: 'computer', content: data }]);
      }, 1000);
    }
  };

  return (
    <Flex w='100%' h='100vh' justify='center' align='center' border='5px solid red'>
      <Flex w='80%' h='90%' flexDir='column' border='2px solid blue'>
        <Header />
        <Separator />
        <MessageField messages={messages} />
        <Footer 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
}