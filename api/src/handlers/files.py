from pathlib import Path
from typing import Literal

from fastapi import APIRouter, Query
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/files/uploads/{filename}")
async def get_file(filename: str, fm: Literal["webp"] = Query(None)):
    if fm == "webp":
        # remove original extension and replace it with .webp
        filename = f"{"".join(filename.split(".")[:-1])}.webp"
    print(filename)
    file = "uploads" / Path(filename)
    if file.exists():
        return FileResponse(file)
    return {"message": "File not found"}
