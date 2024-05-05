from io import BytesIO
from typing import Any

from fastapi.exceptions import ValidationException
from fastapi_storages import StorageFile, StorageImage
from fastapi_storages.integrations.sqlalchemy import ImageType
from PIL import Image, UnidentifiedImageError
from sqlalchemy import Dialect


class CustomImageType(ImageType):
    def process_result_value(self, value: Any, dialect: Dialect) -> StorageFile | None:  # pyright: ignore
        if value is None:
            return value

        return StorageFile(name=value, storage=self.storage)


class CompressedImageType(CustomImageType):
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

        original_image_storage = self._save_image_to_storage(value.file, image_file, value)

        image_file = Image.open(value.file)
        image_file = image_file.resize(
            (1200, 1200 * image_file.height // image_file.width), Image.Resampling.LANCZOS
        )
        buffer = BytesIO()
        image_file.save(buffer, format="WebP", quality=85)
        self._save_image_to_storage(buffer, image_file, value, "webp")

        image_file.close()
        value.file.close()
        return original_image_storage.name

    def _save_image_to_storage(
        self, buffer: BytesIO, image_file: Image.Image, value: Any, extension: str | None = None
    ) -> StorageImage:
        image = StorageImage(
            name=f"{value.filename.split(".")[0]}.{extension}" if extension else value.filename,
            storage=self.storage,
            height=image_file.height,
            width=image_file.width,
        )
        image.write(file=buffer)
        return image
