from pydantic import BaseModel, Field
from typing import List, Optional
from app.models.enums import IdeaStatus
from beanie import PydanticObjectId


class IdeaBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    problem_statement: str
    proposed_solution: str


# Schema for creating an idea (Inputs)
class IdeaCreate(IdeaBase):
    customer_name: str
    domain: str
    track: str
    benefit_metrics: List[str]


# Schema for reading an idea (Outputs)
class IdeaRead(IdeaBase):
    id: PydanticObjectId = Field(alias="_id")
    status: IdeaStatus
    owner_id: PydanticObjectId
    average_score: float

    class Config:
        from_attributes = True  # Allows Pydantic to read from Beanie/ORM objects
