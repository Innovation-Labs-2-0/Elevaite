from typing import List, Optional
from beanie import Indexed, PydanticObjectId
from pydantic import BaseModel
from app.models.base import BaseDocument
from app.models.enums import IdeaStatus

class IdeaContext(BaseModel):
    customer_name: str
    domain: str
    track: str

class Idea(BaseDocument):
    owner_id: Indexed(PydanticObjectId)
    title: str
    context: IdeaContext
    problem_statement: str
    proposed_solution: str
    impact_description: str
    benefit_metrics: List[str]  # e.g., ["Cost Reduction", "Efficiency"]
    status: IdeaStatus = IdeaStatus.DRAFT
    
    # Aggregated Score (Updated via background tasks for performance)
    average_score: float = 0.0
    review_count: int = 0

    class Settings:
        name = "ideas"
        indexes = [
            [("status", 1), ("context.domain", 1)],
        ]