from sqlalchemy import ForeignKey, Integer
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


class Base(DeclarativeBase):
    pass


class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    description: Mapped[str]
    price: Mapped[int] = mapped_column(Integer())
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))

    category: Mapped["Category"] = relationship(back_populates="products")

    def __repr__(self) -> str:
        return f"Product(id={self.id!r}, title={self.title!r})"


class Category(Base):
    __tablename__ = "category"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    slug: Mapped[str] = mapped_column(String(50))

    products: Mapped[list["Product"]] = relationship(
        back_populates="category", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Category(id={self.id!r}, title={self.title!r})"
