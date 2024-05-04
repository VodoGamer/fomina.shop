from io import BytesIO
from typing import Any

from fastapi.exceptions import ValidationException
from fastapi_storages import StorageImage
from fastapi_storages.integrations.sqlalchemy import ImageType
from PIL import Image, UnidentifiedImageError
from sqlalchemy import Dialect


class CustomImageType(ImageType):
    def process_bind_param(self, value: Any, dialect: Dialect) -> str | None:
        if value is None:
            return value
        if len(value.file.read(1)) != 1:
            return None

        try:
            image_file = Image.open(value.file)
            image_file.verify()
        except UnidentifiedImageError:
            raise ValidationException("Invalid image file") from UnidentifiedImageError

        image_file = Image.open(value.file)  # TODO: improve this
        buffer = BytesIO()
        image_file.save(buffer, format="WebP", quality=85)

        image = StorageImage(
            name=value.filename.split(".")[0] + ".webp",
            storage=self.storage,
            height=image_file.height,
            width=image_file.width,
        )
        image.write(file=buffer)

        image_file.close()
        value.file.close()
        return image.name

    def process_result_value(self, value: Any, dialect: Dialect) -> StorageImage | None:
        if value is None:
            return value

        with Image.open(self.storage.get_path(value)) as image:
            return StorageImage(
                name=value, storage=self.storage, height=image.height, width=image.width
            )
