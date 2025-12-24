from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import init_db
from app.api.api import api_router
import os
import uvicorn


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize MongoDB/Beanie
    await init_db()
    yield
    # Shutdown logic (if any) goes here


app = FastAPI(title="Elevaite Portal API", lifespan=lifespan)

# CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "FastAPI Code From Local Machine"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
