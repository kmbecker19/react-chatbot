from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage, trim_messages
from uuid import uuid4, UUID

# Initialize the chat model
model = init_chat_model('gpt-4o-mini', model_provider='openai')

# Set up prompt template
prompt_template = ChatPromptTemplate.from_messages(
    [
        (
            'system',
            'You are a helpful AI assistant named HoneyChat. Answer all questions to the best of your ability.'
        ),
        (
            'assistant',
            'Hi, My name is HoneyChat'
        ),
        MessagesPlaceholder(variable_name='messages'),
    ]
)

# Messages trimmer
trimmer = trim_messages(
    max_tokens=1024,
    strategy='last',
    token_counter=model,
    include_system=True,
    allow_partial=False,
    start_on='human',
)


# Function to call model
def call_model(state: MessagesState):
    trimmed_msg = trimmer.invoke(state['messages'])
    prompt = prompt_template.invoke({'messages': trimmed_msg})
    response = model.invoke(prompt)
    return {'messages': response}


# Initialize the state graph
workflow = StateGraph(state_schema=MessagesState)
workflow.add_edge(START, 'model')
workflow.add_node('model', call_model)

app = workflow.compile(checkpointer=MemorySaver())


# Function to return AIMessage
def get_ai_message(query: str, thread_id: UUID | str) -> AIMessage:
    input_messages = [HumanMessage(query)]
    output = app.invoke({'messages': input_messages}, {'configurable': {'thread_id': thread_id}})
    return output['messages'][-1]


def invoke_model(input_messages, thread_id):
    return app.invoke({'messages': input_messages}, {'configurable': {'thread_id': thread_id}})
