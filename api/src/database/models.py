import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from src.client import storage
from src.storage.images import CompressedImageType


class Base(DeclarativeBase):
    pass


products_categories = Table(
    "products_categories",
    Base.metadata,
    Column("product_id", ForeignKey("product.id")),
    Column("category", ForeignKey("category.id")),
)

products_variations = Table(
    "products_variations",
    Base.metadata,
    Column("product_id", ForeignKey("product.id")),
    Column("variation_id", ForeignKey("product_variation.id")),
)


class Product(Base):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(Text())
    price: Mapped[int] = mapped_column(Integer())
    position_order: Mapped[int] = mapped_column(
        Integer(), default=0, server_default="0", nullable=False
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(),
        onupdate=datetime.datetime.now(),
        server_default=func.now(),
    )

    images: Mapped[list["ProductImage"]] = relationship(back_populates="product", lazy="selectin")
    categories: Mapped[list["Category"]] = relationship(secondary=products_categories)
    variations: Mapped[list["ProductVariation"]] = relationship(
        secondary=products_variations, lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"Product(id={self.id!r}, title={self.title!r})"


class Category(Base):
    __tablename__ = "category"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50))
    slug: Mapped[str] = mapped_column(String(50))
    position_order: Mapped[int] = mapped_column(
        Integer(), default=0, server_default="0", nullable=False
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(),
        onupdate=datetime.datetime.now(),
        server_default=func.now(),
    )

    def __repr__(self) -> str:
        return f"Category(id={self.id!r}, title={self.title!r})"


class ProductImage(Base):
    __tablename__ = "product_image"
    id = mapped_column(Integer, primary_key=True)
    url = mapped_column(CompressedImageType(storage), nullable=False)
    description = mapped_column(String(100), nullable=True)
    product_id = mapped_column(Integer, ForeignKey("product.id"))
    position_order: Mapped[int] = mapped_column(
        Integer(), default=0, server_default="0", nullable=False
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(),
        onupdate=datetime.datetime.now(),
        server_default=func.now(),
    )

    product = relationship("Product", back_populates="images")

    def __repr__(self) -> str:
        return f"ProductImage(id={self.id!r}, description={self.description!r})"


class ProductVariation(Base):
    __tablename__ = "product_variation"
    id = mapped_column(Integer, primary_key=True)
    key = mapped_column(String(50), nullable=False)
    value = mapped_column(String(50), nullable=False)

    def __repr__(self) -> str:
        return f"ProductVariation(id={self.id!r}, key={self.key!r}, value={self.value!r})"
