from pathlib import Path
from typing import BinaryIO

from fastapi_storages import FileSystemStorage
from fastapi_storages.utils import secure_filename


class CustomSystemStorage(FileSystemStorage):
    def __init__(self, path: str) -> None:
        self._path = Path(path)
        self._public_path = Path("ui", "public", self._path)

        self._public_path.mkdir(parents=True, exist_ok=True)

    def write(self, file: BinaryIO, name: str) -> str:
        """
        Write input file which is opened in binary mode to destination.
        """
        filename = secure_filename(name)
        path = self._path / Path(filename)

        file.seek(0, 0)
        with open(Path(self._public_path, filename), "wb") as output:
            while True:
                chunk = file.read(self.default_chunk_size)
                if not chunk:
                    break
                output.write(chunk)
        return str(path)
