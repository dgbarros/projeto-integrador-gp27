from app.core.config import SessionLocal
from app.models.user_db import UserDB
from app.models.user_model import UserCreate
from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_senha(senha: str):
    senha_bytes = senha.encode("utf-8")
    senha_hash = hashlib.sha256(senha_bytes).digest()
    return pwd_context.hash(senha_hash)


def verificar_senha(senha: str, hash: str):
    senha_bytes = senha.encode("utf-8")
    senha_hash = hashlib.sha256(senha_bytes).digest()
    return pwd_context.verify(senha_hash, hash)


def get_db():
    return SessionLocal()


def criar_usuario(user: UserCreate):
    db = get_db()

    print("CRIANDO USUÁRIO:", user.email)

    novo_user = UserDB(
        nome=user.nome,
        email=user.email,
        senha_hash=hash_senha(user.senha) 
    )

    db.add(novo_user)
    db.commit()
    db.refresh(novo_user)

    print("SALVO NO DB:", novo_user.id)

    db.close()


    return novo_user


def login(email: str, senha: str):
    db = get_db()

    user = db.query(UserDB).filter(UserDB.email == email).first()

    if not user or not verificar_senha(senha, user.senha_hash):
        db.close()
        return None

    db.close()
    return user