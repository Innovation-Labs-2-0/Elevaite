from fastapi import APIRouter
from app.api import ideas, users

api_router = APIRouter(prefix="/api")
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
