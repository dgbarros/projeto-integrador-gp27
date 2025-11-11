from pydantic import BaseModel


class Meta(BaseModel):
    titulo: str
    kpi: str
    valor_alvo: float
    prazo: str  # formato: YYYY-MM-DD
