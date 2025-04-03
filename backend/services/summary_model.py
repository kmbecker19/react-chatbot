from typing import Sequence, Annotated, TypedDict

from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, StateGraph, add_messages, MessagesState
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, trim_messages
from uuid import uuid4

# Initialize the chat model
model = init_chat_model('gpt-4o-mini', model_provider='openai')

prompt_template = ChatPromptTemplate.from_messages(
    [
        (
            'system',
            'Your job is to take the conversation history you get and output a short summary of the conversation that can be used as a title for the conversation. ',
        ),
        MessagesPlaceholder(variable_name='messages'),
    ]
)


def call_model(state: MessagesState):
    summary_prompt = prompt_template.invoke({'messages': state['messages']})
    summary = model.invoke(summary_prompt)
    return {'messages': [summary]}


# Define graph
workflow = StateGraph(state_schema=MessagesState)
workflow.add_node('model', call_model)
workflow.add_edge(START, 'model')

app = workflow.compile(checkpointer=MemorySaver())


# Function to return AI Summary
async def aget_summary(input_messages):
    thread_id = str(uuid4())
    return await app.ainvoke({'messages': input_messages}, {'configurable': {'thread_id': thread_id}})


def get_summary(input_messages):
    thread_id = str(uuid4())
    return app.invoke({'messages': input_messages}, {'configurable': {'thread_id': thread_id}})