from sqlalchemy import Column, ForeignKey, Integer, String, Date, Float
from sqlalchemy.orm import relationship
from App.database import Base

# Model Usuário

class Usuario(Base):
    __tablename__ = "usuario"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    senha = Column(String(100), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    cidade = Column(String(100))
    estado = Column(String(100))

    avaliacoes = relationship("Avaliacao", back_populates="usuario")
    denuncias = relationship("Denuncia", back_populates="usuario")

# Model Servico

class ServicoPublico(Base):
    __tablename__ = "servico_publico"

    id_servico = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    horario_funcionamento = Column(String)
    telefone = Column(String)
    id_orgao = Column(Integer, ForeignKey("orgao_responsavel.id_orgao"))  # esta linha depende do nome da tabela
    rua = Column(String(100))
    bairro = Column(String(100))
    cidade = Column(String(100))
    estado = Column(String(100))
    cep = Column(String(20))
    latitude = Column(Float, nullable=True)    # NOVO CAMPO
    longitude = Column(Float, nullable=True)   # NOVO CAMPO

    avaliacoes = relationship("Avaliacao", back_populates="servico")
    denuncias = relationship("Denuncia", back_populates="servico")

# Model Avaliacao

class Avaliacao(Base):
    __tablename__ = "avaliacao"
    id_avaliacao = Column(Integer, primary_key=True, index=True)
    nota = Column(Integer, nullable=False)
    comentario = Column(String)
    data = Column(Date, nullable=False)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    id_servico = Column(Integer, ForeignKey("servico_publico.id_servico"))

    usuario = relationship("Usuario", back_populates="avaliacoes")
    servico = relationship("ServicoPublico", back_populates="avaliacoes")

# Model Denuncia 

class Denuncia(Base):
    __tablename__ = "denuncia"
    id_denuncia = Column(Integer, primary_key=True, index=True)
    descricao = Column(String, nullable=False)
    tipo_problema = Column(String(100), nullable=False)
    data = Column(Date, nullable=False)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    id_servico = Column(Integer, ForeignKey("servico_publico.id_servico"))

    usuario = relationship("Usuario", back_populates="denuncias")
    servico = relationship("ServicoPublico", back_populates="denuncias")

class OrgaoResponsavel(Base):
    __tablename__ = "orgao_responsavel"
    
    id_orgao = Column(Integer, primary_key=True, index=True)
    nome_orgao = Column(String(100), nullable=False)
    esfera = Column(String(50))
    contato = Column(String(100))
