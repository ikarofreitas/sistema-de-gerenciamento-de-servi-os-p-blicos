from typing import Optional
from pydantic import BaseModel
from datetime import date

# Usuário
class UsuarioBase(BaseModel):
    nome: str
    email: str
    senha: str
    data_nascimento: date
    cidade: Optional[str] = None
    estado: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioOut(UsuarioBase):
    id_usuario: int
    class Config:
        from_attributes = True

# Serviço Público
class ServicoPublicoBase(BaseModel):
    nome: str
    horario_funcionamento: Optional[str] = None
    telefone: Optional[str] = None
    rua: Optional[str] = None
    bairro: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    cep: Optional[str] = None
    id_orgao: Optional[int] = None

class ServicoPublicoCreate(ServicoPublicoBase):
    pass

class ServicoPublicoOut(ServicoPublicoBase):
    id_servico: int
    class Config:
        from_attributes = True
