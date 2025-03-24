/**
 * Interfaces for use wih TypeScript for the react-chatbot application.
 */

export interface Message {
  role: string;
  content: string;
}

export interface MessageList {
  messages: Message[];
}

export interface FooterProps {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleSendMessage: () => void;
}