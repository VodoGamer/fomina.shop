from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/files/uploads/{filename}")
async def get_file(filename: str):
    file = "uploads" / Path(filename)
    if file.exists():
        return FileResponse(file)
    return {"message": "File not found"}
