
from typing import List, Optional
from sqlalchemy.types import String, Uuid
from sqlalchemy import text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
# from ..cart_item.model import CartItem
from backend import db
import uuid
import datetime

"""
Cart schema: 
Id: postgres.UUID (primary key)
Items: List[CartItem]
- set as ON DELETE CASCADE (so that whenever a cart row gets deleted, all corresponding cartItem rows also get deleted)
Creator: User
Users: List[User]
"""
class Cart(db.Model):
    __tablename__ = "cart_table"
    
    # https://stackoverflow.com/questions/76741476/how-can-i-create-a-table-with-a-uuid-column-in-a-postgres-db-using-sqlalchemy
    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        # init=False,
        server_default=text("gen_random_uuid()") 
        )
    title: Mapped[str] = mapped_column()
    description: Mapped[str | None] = mapped_column()
    date_created: Mapped[datetime.datetime] = mapped_column()
    cart_items: Mapped[List["Cart_Item"] | None] = relationship(cascade="all, delete")  
    creator: Mapped[str | None] = mapped_column(ForeignKey("user_table.id"))# "User" | None is equivalent to Optional["User"] indicating nullable field
        # TODO: does this need back_population? 
        # TODO: do we want unregistered users to be able to make carts?
    # users: Mapped[List[String] | None] = mapped_column() # users who can edit metadata 




