from typing import List
from fastapi import APIRouter, Depends, status
from app.models.idea import Idea
from app.models.user import User
from app.schemas.idea import IdeaCreate, IdeaRead
from app.services.idea_service import IdeaService
from app.core.security import get_current_user

router = APIRouter()

@router.post("/", response_model=IdeaRead, status_code=status.HTTP_201_CREATED)
async def create_idea(
    idea_in: IdeaCreate, 
    current_user: User = Depends(get_current_user)
):
    return await IdeaService.create_idea(idea_in, current_user)

@router.get("/", response_model=List[IdeaRead])
async def list_ideas(current_user: User = Depends(get_current_user)):
    # RBAC: Admins see all, Users see only theirs
    if current_user.role == "ADMIN":
        return await Idea.find_all().to_list()
    return await Idea.find(Idea.owner_id == current_user.id).to_list()

@router.get("/{idea_id}", response_model=IdeaRead)
async def get_idea(idea_id: str, current_user: User = Depends(get_current_user)):
    idea = await Idea.get(idea_id)
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    return idea