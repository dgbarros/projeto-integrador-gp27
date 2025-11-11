from fastapi import APIRouter, HTTPException
from typing import List
from app.models.meta_model import Meta
from app.services import meta_services

router = APIRouter(prefix="/metas", tags=["Metas"])


@router.get("/get_metas", response_model=List[Meta])
def listar_metas():
    """Retorna todas as metas cadastradas"""
    return meta_services.carregar_metas()


@router.post("/post_cadastrar_metas", response_model=Meta)
def criar_meta(meta: Meta):
    """Cadastra uma nova meta"""
    metas = meta_services.carregar_metas()
    metas.append(meta)
    meta_services.salvar_metas(metas)
    return meta
