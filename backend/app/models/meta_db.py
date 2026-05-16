from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.config import Base


class MetaDB(Base):
    __tablename__ = "metas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    kpi = Column(String)
    valor_alvo = Column(Float)
    prazo = Column(String)
    status = Column(String, default="Pendente de aprovação")

    usuario_id = Column(Integer, ForeignKey("usuarios.id"))