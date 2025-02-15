from typing import List, Optional
from sqlalchemy.types import String, Uuid
from sqlalchemy import text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend import db
import uuid


"""
User schema:
Id: postgres.UUID (primary key)
Mail: Text
Name: Text
PasswordHash: Text (nullable)
TimeStampOfEarliestValidToken: int (nullable)
CartsCreated: List[String]
- List[String] => Stores cart_id's
"""


class User(db.Model):
    __tablename__ = "user_table"
    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, server_default=text("gen_random_uuid()")
    )
    email: Mapped[str] = mapped_column()  # TODO: set unique?
    name: Mapped[str] = mapped_column()
    password_hash: Mapped[str] = mapped_column()
    time_stamp_earliest_valid_token: Mapped[int | None] = mapped_column()
    carts_created: Mapped[List["Cart"] | None] = (
        relationship()
    )  # TODO: check if this is even right...
    carts_shared: Mapped[List["Cart"] | None] = relationship()
