from app.models.idea import Idea
from app.schemas.idea import IdeaCreate
from app.models.user import User

class IdeaService:
    @staticmethod
    async def create_idea(idea_in: IdeaCreate, owner: User) -> Idea:
        # Business logic: Check if submission window is open
        # (This could be a DB check against a 'Settings' collection)
        
        new_idea = Idea(
            owner_id=owner.id,
            title=idea_in.title,
            context=idea_in.context,
            problem_statement=idea_in.problem_statement,
            proposed_solution=idea_in.proposed_solution,
            impact_description=idea_in.impact_description,
            benefit_metrics=idea_in.benefit_metrics
        )
        return await new_idea.insert()