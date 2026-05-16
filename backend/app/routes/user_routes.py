from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.user_model import UserCreate, UserLogin, UserResponse
from app.services import user_services

from app.core.security import criar_token_jwt 

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

class Token(BaseModel):
    access_token: str
    token_type: str
    nome: str

@router.post("/cadastro", response_model=UserResponse)
def cadastrar(user: UserCreate):
    return user_services.criar_usuario(user)


@router.post("/login", response_model=Token) 
def login(dados: UserLogin):
    user = user_services.login(dados.email, dados.senha)

    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

   
    token = criar_token_jwt(data={"sub": str(user.id)})

    return {
        "access_token": token,
        "token_type": "bearer",
        "nome": user.nome
    }