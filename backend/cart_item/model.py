from sqlalchemy.orm import Mapped, mapped_column, relationship 
from sqlalchemy.types import String
from backend import db

"""
CartItem schema: [generate multiple of same cartitem? Or no?]
Id: int (primary key)
itemName: String
Quantity: int
"""
class Cart_Item(db.Model):
    __tablename__ = "cart_items_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    item_name: Mapped[str] = mapped_column()
    quantity: Mapped[int] = mapped_column()

