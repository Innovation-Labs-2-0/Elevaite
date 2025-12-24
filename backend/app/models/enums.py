from enum import Enum


class Role(str, Enum):
    ADMIN = "ADMIN"
    REVIEWER = "REVIEWER"
    USER = "USER"


class IdeaStatus(str, Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    SHORTLISTED = "SHORTLISTED"
    REJECTED = "REJECTED"


class Phase(str, Enum):
    IDEATHON = "IDEATHON"
    HACKATHON = "HACKATHON"
