from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship, backref

from app.db.database import Base

class User(Base):
    __tablename__ = "User"

    user_idx = Column(Integer, primary_key=True, index=True)
    user_email = Column(String)
    user_name = Column(String)
    user_provider = Column(Integer)
    user_roles = Column(Integer)
    user_image_url = Column(String)

class ReadArticle(Base):
    __tablename__ = "ReadArticle"

    read_idx = Column(Integer, primary_key=True, index=True)
    user_idx = Column(Integer, ForeignKey('User.user_idx'))
    user = relationship("User", backref=backref("articles", order_by=read_idx))
    article_idx = Column(Integer)
    read_date = Column(Date)
    valid_date = Column(Date)