from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import meta_routes, user_routes

from app.core.config import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Metas KPIs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meta_routes.router)
app.include_router(user_routes.router)