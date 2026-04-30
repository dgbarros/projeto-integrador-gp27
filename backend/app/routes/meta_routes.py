from fastapi import APIRouter, HTTPException
from typing import List
from app.models.meta_model import Meta, MetaUpdate, MetaCreate
from app.services import meta_services

router = APIRouter(prefix="/metas", tags=["Metas"])


@router.get("/", response_model=List[Meta])
def listar_metas():
    return meta_services.listar_metas()


@router.get("/{meta_id}", response_model=Meta)
def get_meta(meta_id: int):
    meta = meta_services.get_meta(meta_id)

    if not meta:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return meta


@router.post("/", response_model=Meta)
def criar_meta(meta: MetaCreate):
    return meta_services.criar_meta(meta)


@router.put("/aprovar/{meta_id}", response_model=Meta)
def aprovar_meta(meta_id: int):
    meta = meta_services.aprovar_meta(meta_id)

    if not meta:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return meta

@router.put("/revisar/{meta_id}", response_model=Meta)
def revisar_meta(meta_id: int):
    meta = meta_services.revisar_meta(meta_id)

    if not meta:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return meta

@router.put("/{meta_id}", response_model=Meta)
def editar_meta(meta_id: int, meta_atualizada: MetaUpdate):
    meta = meta_services.editar_meta(meta_id, meta_atualizada.dict())

    if not meta:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return meta


@router.delete("/{meta_id}")
def deletar_meta(meta_id: int):
    sucesso = meta_services.deletar_meta(meta_id)

    if not sucesso:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return {"msg": "Meta deletada com sucesso"}