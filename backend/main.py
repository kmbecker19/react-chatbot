from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from typing import Annotated

from langchain_core.messages import HumanMessage
from models import Message, MessageCreate, ConversationThread
from database import SessionDep, lifespan
from services.chatbot import invoke_model, ainvoke_model
from services.agent import ainvoke_agent

import uvicorn

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
@app.post('/chat', response_model=ConversationThread)
def create_conversation(session: SessionDep):
    new_thread = ConversationThread()
    session.add(new_thread)
    session.commit()
    session.refresh(new_thread)
    return new_thread


@app.post('/chat/{thread_id}', response_model=Message)
async def get_completion(thread_id: str, message: MessageCreate, session: SessionDep):
    thread = session.get(ConversationThread, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    content = message.content
    input_message = HumanMessage(content)
    output = await ainvoke_agent(input_message, thread_id)
    completion = output['messages'][-1]
    return Message(id=completion.id, role='assistant', content=completion.content, thread_id=thread_id)


@app.get('/chat', response_model=list[ConversationThread])
def get_all_conversations(session: SessionDep):
    return session.exec(select(ConversationThread)).all()


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)