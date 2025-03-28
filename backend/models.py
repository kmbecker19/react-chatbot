from sqlmodel import SQLModel, Field
from uuid import uuid4


class ConversationThread(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)


class Message(SQLModel, table=True):
    id: str = Field(primary_key=True)
    role: str
    content: str
    thread_id: str = Field(foreign_key='conversationthread.id')


class MessageCreate(SQLModel):
    role: str = Field(default='user')
    content: str
