from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from uuid import uuid4

# Initialize the chat model
model = init_chat_model('gpt-4o-mini', model_provider='openai')

# Set up prompt template
prompt_template = ChatPromptTemplate.from_messages(
    [
        (
            'system',
            'You are a helpful AI assistant. Answer all questions to the best of your ability.'
        ),
        MessagesPlaceholder(variable_name='messages'),
    ]
)

# Function to call model
def call_model(state: MessagesState):
    prompt = prompt_template.invoke(state)
    response = model.invoke(prompt)
    return {'messages': response}

# Initialize the state graph
workflow = StateGraph(state_schema=MessagesState)
workflow.add_edge(START, 'model')
workflow.add_node('model', call_model)

app = workflow.compile(checkpointer=MemorySaver())

# Config object for running app
config = {'configurable': {'thread_id': uuid4()}}


# Function to return AIMessage
def get_ai_message(query: str) -> AIMessage:
    input_messages = [HumanMessage(query)]
    output = app.invoke({'messages': input_messages}, config)
    return output['messages'][-1]
