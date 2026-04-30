from app.core.config import SessionLocal
from app.models.meta_db import MetaDB


def get_db():
    return SessionLocal()


def listar_metas():
    db = get_db()
    metas = db.query(MetaDB).all()
    db.close()
    return metas


def get_meta(meta_id: int):
    db = get_db()
    meta = db.query(MetaDB).filter(MetaDB.id == meta_id).first()
    db.close()
    return meta


def criar_meta(meta):
    db = get_db()

    nova = MetaDB(**meta.dict())

    db.add(nova)
    db.commit()
    db.refresh(nova)
    db.close()

    return nova


def deletar_meta(meta_id: int):
    db = get_db()
    meta = db.query(MetaDB).filter(MetaDB.id == meta_id).first()

    if not meta:
        db.close()
        return None

    db.delete(meta)
    db.commit()
    db.close()

    return True


def aprovar_meta(meta_id: int):
    db = get_db()
    meta = db.query(MetaDB).filter(MetaDB.id == meta_id).first()

    if not meta:
        db.close()
        return None

    meta.status = "Aprovada"
    db.commit()
    db.refresh(meta)
    db.close()

    return meta

def revisar_meta(meta_id: int):
    db = get_db()
    meta = db.query(MetaDB).filter(MetaDB.id == meta_id).first()

    if not meta:
        db.close()
        return None

    meta.status = "Revisão solicitada"
    db.commit()
    db.refresh(meta)
    db.close()

    return meta


def editar_meta(meta_id: int, dados: dict):
    db = get_db()
    meta = db.query(MetaDB).filter(MetaDB.id == meta_id).first()

    if not meta:
        db.close()
        return None

    for key, value in dados.items():
        if value is not None:
            setattr(meta, key, value)

    db.commit()
    db.refresh(meta)
    db.close()

    return meta