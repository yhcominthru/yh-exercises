from database import Base
from sqlalchemy import Column, Integer, String

class Books(Base): #Class Name to Carry the SQL table
    __tablename__ = "books" # Table Name in SQL

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    published_year = Column(Integer)