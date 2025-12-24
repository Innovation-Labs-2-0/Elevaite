class RatingItem(BaseModel):
    criteria_id: str
    score: float  # 1.0 to 5.0

class Review(BaseDocument):
    idea_id: Indexed(PydanticObjectId)
    reviewer_id: Indexed(PydanticObjectId)
    ratings: List[RatingItem]
    comments: Optional[str] = None
    is_finalized: bool = False

    class Settings:
        name = "reviews"
        # Prevent duplicate reviews from the same reviewer on the same idea
        indexes = [
            [("idea_id", 1), ("reviewer_id", 1), {"unique": True}]
        ]