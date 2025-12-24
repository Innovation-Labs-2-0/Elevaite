import logging
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.idea import Idea

logger = logging.getLogger(__name__)


async def init_db():
    try:
        logger.info(
            f"Connecting to MongoDB at {settings.MONGODB_URL.split('@')[-1]}"
        )  # Log host only for safety
        client = AsyncIOMotorClient(settings.MONGODB_URL, serverSelectionTimeoutMS=5000)

        # Ping the database to check if the connection is actually working
        await client.admin.command("ping")

        await init_beanie(
            database=client[settings.DATABASE_NAME], document_models=[User, Idea]
        )
        logger.info("Successfully initialized Beanie and MongoDB")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise e  # Re-raise to stop the container
