from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


products_categories = Table(
    "products_categories",
    Base.metadata,
    Column("product_id", ForeignKey("product.id")),
    Column("category", ForeignKey("category.id")),
)


class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    description: Mapped[str]
    price: Mapped[int] = mapped_column(Integer())

    categories: Mapped[list["Category"]] = relationship(secondary=products_categories)

    def __repr__(self) -> str:
        return f"Product(id={self.id!r}, title={self.title!r})"


class Category(Base):
    __tablename__ = "category"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    slug: Mapped[str] = mapped_column(String(50))

    def __repr__(self) -> str:
        return f"Category(id={self.id!r}, title={self.title!r})"
