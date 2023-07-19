from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    ...


class Category(Base):
    __tablename__ = "category"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30))
    slug: Mapped[str] = mapped_column(String(30), unique=True)
    image_path: Mapped[str] = mapped_column(String(255), nullable=True)

    products: Mapped[list["Product"]] = relationship(
        back_populates="category", cascade="all, delete-orphan"
    )


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


class Image(Base):
    __tablename__ = "image"

    id: Mapped[int] = mapped_column(primary_key=True)
    path: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))

    product: Mapped["Product"] = relationship(back_populates="images")
