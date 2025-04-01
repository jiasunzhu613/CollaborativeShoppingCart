from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import String, BigInteger
from sqlalchemy import ForeignKey
from backend.cart.model import Cart
from backend import db
import uuid

"""
CartItem schema: [generate multiple of same cartitem? Or no?]
Id: int (primary key)
itemName: String
Quantity: int
category: String
"""
class Cart_Item(db.Model):
    __tablename__ = "cart_item_table"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    cart_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("cart_table.id", ondelete='CASCADE'))
    cart: Mapped["Cart"] = relationship() # NOTE: I guess if you have a foreign key you must also have a field that holds the foreign object?
    item_name: Mapped[str] = mapped_column()
    quantity: Mapped[int] = mapped_column()
    category: Mapped[str | None] = mapped_column() # category can be nullable

