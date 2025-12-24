from datetime import datetime
from typing import Optional
from beanie import Document
from pydantic import Field

class BaseDocument(Document):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        # This prevents Beanie from creating a collection for the base class itself
        is_root = True 

    async def update_timestamp(self):
        self.updated_at = datetime.utcnow()
        await self.save()