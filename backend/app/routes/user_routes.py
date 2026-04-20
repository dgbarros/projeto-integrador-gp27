from fastapi import APIRouter, HTTPException
from app.models.user_model import UserCreate, UserLogin, UserResponse
from app.services import user_services

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.post("/cadastro", response_model=UserResponse)
def cadastrar(user: UserCreate):
    return user_services.criar_usuario(user)


@router.post("/login", response_model=UserResponse)
def login(dados: UserLogin):
    user = user_services.login(dados.email, dados.senha)

    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return user