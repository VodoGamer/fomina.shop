from typing import Iterable

from sqladmin import ModelView

from src.database.models import Category, Product, ProductImage


class ProductAdmin(ModelView, model=Product):
    column_list = [Product.id, Product.title, Product.price]


class CategoryAdmin(ModelView, model=Category):
    name_plural = "Categories"
    column_list = [Category.id, Category.title]


class ImageAdmin(ModelView, model=ProductImage):
    column_list = [ProductImage.id, ProductImage.url]


admin_views: Iterable[type[ModelView]] = (ProductAdmin, CategoryAdmin, ImageAdmin)
