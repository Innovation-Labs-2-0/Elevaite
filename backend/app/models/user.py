from beanie import Indexed
from app.models.base import BaseDocument
from app.models.enums import Role
from typing import Optional


class User(BaseDocument):
    firebase_uid: str = Indexed(unique=True)
    email: str = Indexed(unique=True)
    full_name: str
    role: Role = Role.USER
    service_line: Optional[str] = None
    business_unit: Optional[str] = None

    class Settings:
        name = "users"
