from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from beanie import PydanticObjectId
from app.models.enums import Role


class UserRead(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    email: EmailStr
    full_name: str
    role: Role
    service_line: Optional[str]
    business_unit: Optional[str]

    class Config:
        populate_by_name = True


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    service_line: Optional[str] = None
    business_unit: Optional[str] = None
