from app.core.config import SessionLocal
from app.models.user_db import UserDB
from app.models.user_model import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_senha(senha: str):
    return pwd_context.hash(senha)


def verificar_senha(senha: str, hash: str):
    return pwd_context.verify(senha, hash)


def get_db():
    return SessionLocal()


def criar_usuario(user: UserCreate):
    db = get_db()

    novo_user = UserDB(
        nome=user.nome,
        email=user.email,
        senha_hash=hash_senha(user.senha)  # ✅ corrigido
    )

    db.add(novo_user)
    db.commit()
    db.refresh(novo_user)
    db.close()

    return novo_user


def login(email: str, senha: str):
    db = get_db()

    user = db.query(UserDB).filter(UserDB.email == email).first()

    # ✅ corrigido
    if not user or not verificar_senha(senha, user.senha_hash):
        db.close()
        return None

    db.close()
    return user