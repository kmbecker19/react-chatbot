from sqlmodel import SQLModel, Field, Session, create_engine, select
from uuid import uuid4


class ConversationThread(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)

class Message(SQLModel, table=True):
    id: str | None = Field(primary_key=True)
    role: str
    content: str
    thread_id: str | None = Field(foreign_key='conversationthread.id')