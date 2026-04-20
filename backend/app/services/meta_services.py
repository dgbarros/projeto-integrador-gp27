import json
import os
from typing import List
from app.models.meta_model import Meta

FILE_PATH = os.path.join(os.path.dirname(__file__), "../data/metas.json")


def carregar_metas() -> List[Meta]:
    """Lê o arquivo JSON e retorna a lista de metas"""
    if not os.path.exists(FILE_PATH):
        return []
    with open(FILE_PATH, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
            return [Meta(**meta) for meta in data]
        except json.JSONDecodeError:
            return []


def salvar_metas(metas: List[Meta]):
    """Salva a lista de metas no arquivo JSON"""
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump([meta.dict() for meta in metas],
                  f, indent=4, ensure_ascii=False)
