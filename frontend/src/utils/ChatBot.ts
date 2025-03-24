import { v4 as uuidv4 } from 'uuid';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Messages,
}  from '@langchain/langgraph';

// Create LLM
const llm = new ChatOpenAI({
  model: 'gpt-40-mini',
  temperature: 0,
});

// Config object
const config = { configurable: { thread_id: uuidv4() } };

// Prompt template
const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    'system',
    'You are a helpful AI assistant. Answer all questions to the best of your ability.',
  ],
  ['placeholder', '{messages}'],
]);

// Define function to call model
async function callModel(state: typeof MessagesAnnotation.State) {
  const prompt = await promptTemplate.invoke(state)
  const response = await llm.invoke(prompt);
  return { messages: response };
}

// Define state graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model')
  .addEdge('model', END);

// Add memory
const app = workflow.compile({ checkpointer: new MemorySaver() });

// Exported function to return responses
async function getModelResponse(input: Messages) {
  const output = await app.invoke({ messages: input }, config);
  return output.messages[output.messages.length - 1];
}

async function getModelResponseStr(input: string): Promise<string> {
  const inputMessage = [
    { role: 'user', content: input },
  ];
  const output = await app.invoke({ messages: inputMessage }, config);
  return String(output.messages[output.messages.length - 1].content);
}

export { getModelResponse, getModelResponseStr };