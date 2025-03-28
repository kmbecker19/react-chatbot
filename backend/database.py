from pathlib import Path
from typing import Annotated
from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, create_engine, Session

from contextlib import asynccontextmanager

db_path = Path().absolute() / 'backend' / 'database.db'
sqlite_url = f'sqlite:///{db_path}'
engine = create_engine(sqlite_url, echo=True, connect_args={
                       'check_same_thread': False})


@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield
    #SQLModel.metadata.drop_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
