from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.core.config import Base

class MetaDB(Base):
    __tablename__ = "metas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    descricao = Column(String)
    status = Column(String, default="Pendente")
    data_inicio = Column(Date)
    data_fim = Column(Date)

    usuario_id = Column(Integer, ForeignKey("usuarios.id"))