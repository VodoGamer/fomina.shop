import enum
from typing import Iterable
from uuid import UUID

from fastapi_storages.integrations.sqlalchemy import FileType
from sqladmin import ModelView
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
    Table,
    Text,
    Uuid,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import false, func

from api.client import storage
from api.services.yookassa.models import PaymentStatus


class Base(DeclarativeBase):
    ...


class Category(Base):
    __tablename__ = "category"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30))
    slug: Mapped[str] = mapped_column(String(30), unique=True)
    image_path: Mapped[str] = mapped_column(String(255), nullable=True)
    is_coming: Mapped[bool] = mapped_column(Boolean(), server_default=false())

    products: Mapped[list["Product"]] = relationship(
        back_populates="category", cascade="all, delete-orphan"
    )


class CategoryAdmin(ModelView, model=Category):
    column_list = [Category.id, Category.title]


class Product(Base):
    __tablename__ = "product"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30))
    description: Mapped[str] = mapped_column(Text())
    price: Mapped[int]
    pub_date: Mapped[str] = mapped_column(DateTime(), server_default=func.now())
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))

    images: Mapped[list["Image"]] = relationship(
        back_populates="product", cascade="all, delete-orphan"
    )
    variations: Mapped[list["ProductVariation"]] = relationship(
        back_populates="product", cascade="all, delete-orphan"
    )
    category: Mapped["Category"] = relationship(back_populates="products")


class ProductAdmin(ModelView, model=Product):
    column_list = [Product.id, Product.title]


class Image(Base):
    __tablename__ = "image"

    id: Mapped[int] = mapped_column(primary_key=True)
    path: Mapped[str] = mapped_column(FileType(storage=storage))
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))

    product: Mapped["Product"] = relationship(back_populates="images")


class ImageAdmin(ModelView, model=Image):
    column_list = [Image.id]


class VariationType(enum.Enum):
    size = "Возраст, рост: "
    color = "Цвет: "


class ProductVariation(Base):
    __tablename__ = "product_variation"

    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str] = mapped_column(Enum(VariationType))
    value: Mapped[str] = mapped_column(String(50))
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))

    product: Mapped["Product"] = relationship(back_populates="variations")


class ProductVariationAdmin(ModelView, model=ProductVariation):
    column_list = [ProductVariation.id, ProductVariation.product]


product_order_table = Table(
    "product_order",
    Base.metadata,
    Column("order_id", ForeignKey("order.id")),
    Column("product_id", ForeignKey("product.id")),
)


class Order(Base):
    __tablename__ = "order"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(255))
    address: Mapped[str] = mapped_column(String(255))
    phone: Mapped[int] = mapped_column(Integer())
    email: Mapped[str] = mapped_column(String(255))

    products: Mapped[list[Product]] = relationship(secondary=product_order_table)
    payment: Mapped["Payment"] = relationship(back_populates="order")


class Payment(Base):
    __tablename__ = "payment"

    id: Mapped[UUID] = mapped_column(Uuid(), primary_key=True)
    amount: Mapped[int] = mapped_column(Integer())
    status: Mapped[PaymentStatus] = mapped_column(Enum(PaymentStatus))

    order_id: Mapped[int] = mapped_column(ForeignKey("order.id"))
    order: Mapped["Order"] = relationship(back_populates="payment")


admin_models: Iterable[type[ModelView]] = (
    CategoryAdmin,
    ProductAdmin,
    ImageAdmin,
    ProductVariationAdmin,
)
