from fastapi import APIRouter, HTTPException
from typing import List

from app.models.meta_model import Meta, MetaUpdate
from app.services import meta_services

router = APIRouter(
    prefix="/metas",
    tags=["Metas"]
)


@router.get("/get_metas", response_model=List[Meta])
def listar_metas():
    return meta_services.listar_metas()


@router.get("/get_meta/{meta_id}", response_model=Meta)
def buscar_meta(meta_id: int):
    meta = meta_services.get_meta(meta_id)

    if not meta:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return meta


@router.post("/post_cadastrar_metas", response_model=Meta)
def criar_meta(meta: Meta):
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


@router.put("/editar/{meta_id}", response_model=Meta)
def editar_meta(meta_id: int, dados: MetaUpdate):
    meta = meta_services.editar_meta(meta_id, dados.dict())

    if not meta:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return meta


@router.delete("/delete/{meta_id}")
def deletar_meta(meta_id: int):
    sucesso = meta_services.deletar_meta(meta_id)

    if not sucesso:
        raise HTTPException(status_code=404, detail="Meta não encontrada")

    return {"message": "Meta deletada com sucesso"}