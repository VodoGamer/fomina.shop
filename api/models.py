from typing import Iterable

from fastapi_storages.integrations.sqlalchemy import FileType
from sqladmin import ModelView
from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import false, func

from api.client import storage


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


admin_models: Iterable[type[ModelView]] = (
    CategoryAdmin,
    ProductAdmin,
    ImageAdmin,
)
