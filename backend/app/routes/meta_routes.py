from fastapi import APIRouter, HTTPException
from typing import List
<<<<<<< HEAD
from app.models.meta_model import Meta
from app.services import meta_services

=======
from app.models.meta_model import Meta, MetaUpdate
from app.services import meta_services
from fastapi import Query
>>>>>>> main
router = APIRouter(prefix="/metas", tags=["Metas"])


@router.get("/get_metas", response_model=List[Meta])
def listar_metas():
    """Retorna todas as metas cadastradas"""
    return meta_services.carregar_metas()

<<<<<<< HEAD

@router.post("/post_cadastrar_metas", response_model=Meta)
def criar_meta(meta: Meta):
    """Cadastra uma nova meta"""
    metas = meta_services.carregar_metas()
    metas.append(meta)
    meta_services.salvar_metas(metas)
    return meta
=======
@router.get("/get_meta/{meta_id}", response_model=Meta)
def get_meta(meta_id: int):
    """Busca uma meta pelo ID"""
    metas = meta_services.carregar_metas()
    for meta in metas:
        if meta.id == meta_id:
            return meta
    raise HTTPException(status_code=404, detail="Meta não encontrada")

@router.post("/post_cadastrar_metas", response_model=Meta)
def criar_meta(meta: Meta):
    metas = meta_services.carregar_metas()

    novo_id = max([m.id for m in metas], default=0) + 1
    meta.id = novo_id

    metas.append(meta)

    meta_services.salvar_metas(metas)

    return meta


@router.put("/update_status/{meta_id}", response_model=Meta)
def atualizar_status_meta(meta_id: int, novo_status: str = Query(...)):
    metas = meta_services.carregar_metas()

    for meta in metas:
        if meta.id == meta_id:
            meta.status = novo_status
            meta_services.salvar_metas(metas)
            return meta

    raise HTTPException(status_code=404, detail="Meta não encontrada")

@router.put("/editar/{meta_id}", response_model=Meta)
def editar_meta(meta_id: int, meta_atualizada: MetaUpdate):
    metas = meta_services.carregar_metas()

    for meta in metas:
        if meta.id == meta_id:
            if meta_atualizada.titulo is not None:
                meta.titulo = meta_atualizada.titulo
            if meta_atualizada.kpi is not None:
                meta.kpi = meta_atualizada.kpi
            if meta_atualizada.valor_alvo is not None:
                meta.valor_alvo = meta_atualizada.valor_alvo
            if meta_atualizada.prazo is not None:
                meta.prazo = meta_atualizada.prazo
            if meta_atualizada.status is not None:
                meta.status = meta_atualizada.status

            meta_services.salvar_metas(metas)
            return meta

    raise HTTPException(status_code=404, detail="Meta não encontrada")






>>>>>>> main
