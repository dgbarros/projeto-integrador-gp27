from typing import Optional
from pydantic import BaseModel

class Meta(BaseModel):
    id: Optional[int] = None
    titulo: str
    kpi: str
    valor_alvo: float
    prazo: str
    status: str = "Pendente de aprovação"

class MetaUpdate(BaseModel):
    titulo: Optional[str] = None
    kpi: Optional[str] = None
    valor_alvo: Optional[float] = None
    prazo: Optional[str] = None
    status: Optional[str] = None
