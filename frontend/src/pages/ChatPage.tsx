import { useState, useEffect } from 'react';
import { Flex, Separator } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MessageField from '../components/MessageField';


export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, My Name is HoneyChat" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const [threadId, setThreadId] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/chat', { method: 'POST' })
     .then((response) => response.json())
     .then((thread) => setThreadId(thread.id))
     .catch((error) => console.error('Error:', error));
  }, []);

  const handleSendMessage = () => {
    if (!!inputMessage.trim().length) {
      const data = inputMessage;

      // Add user message to message list
      setMessages((old) => [...old, { role: 'user', content: data }]);
      setInputMessage("");

      // Echo user message with computer message
      // TODO: Implement Query chatbot here
      // setTimeout(() => {
      //   setMessages((old) => [...old, { role: 'computer', content: data }]);
      // }, 1000);

      console.log(JSON.stringify({ content: data }));

      // Send user message to server
      fetch(`http://localhost:8000/chat/${threadId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'user', content: data }),
      })
        .then((response) => response.json())
        .then((response) => setMessages((old) => [...old, { role: 'assistant', content: response.content }]))
        .catch((error) => console.error('Error:', error));
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