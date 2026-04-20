from typing import Optional
from pydantic import BaseModel
from datetime import date

class MetaBase(BaseModel):
    titulo: str
    descricao: str
    data_inicio: date
    data_fim: date
    usuario_id: int
    status: str = "Pendente"


class MetaCreate(MetaBase):
    pass


class Meta(MetaBase):
    id: int

    class Config:
        orm_mode = True


class MetaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    status: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None