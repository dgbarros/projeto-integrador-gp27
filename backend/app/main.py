from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import meta_routes

app = FastAPI(title="API Metas KPIs")

<<<<<<< HEAD
# CORS (para permitir comunicação com o React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # origem do frontend
=======
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # origem do frontend
>>>>>>> main
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar as rotas
<<<<<<< HEAD
app.include_router(meta_routes.router)
=======
app.include_router(meta_routes.router)
>>>>>>> main
