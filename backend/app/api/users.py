from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User
from app.schemas.user import UserRead, UserUpdate
from app.core.security import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserRead)
async def update_me(
    user_in: UserUpdate, 
    current_user: User = Depends(get_current_user)
):
    update_data = user_in.model_dump(exclude_unset=True)
    await current_user.set(update_data)
    return current_user