from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import meta_routes

app = FastAPI(title="API Metas KPIs")

# CORS (para permitir comunicação com o React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # origem do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar as rotas
app.include_router(meta_routes.router)
