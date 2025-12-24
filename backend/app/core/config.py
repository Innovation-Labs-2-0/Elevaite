from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Elevaite Portal"
    MONGODB_URL: str
    DATABASE_NAME: str = "elevaite_db"
    # CORS Origins (e.g., https://elevaite-portal.web.app)
    ALLOWED_ORIGINS: List[str] = ["*"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()  # type: ignore
