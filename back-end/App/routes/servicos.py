from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App import models, schemas
from App.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

# Get servicos

@router.get("/servicos/", response_model=list[schemas.ServicoPublicoOut])
def listar_servicos(id_orgao: int = None, db: Session = Depends(get_db)):
    query = db.query(models.ServicoPublico)
    if id_orgao:
        query = query.filter(models.ServicoPublico.id_orgao == id_orgao)
    return query.all()

# Post servicos

@router.post("/servicos/", response_model=schemas.ServicoPublicoOut)
def criar_servico(servico: schemas.ServicoPublicoCreate, db: Session = Depends(get_db)):
    db_servico = models.ServicoPublico(**servico.model_dump())
    db.add(db_servico)
    db.commit()
    db.refresh(db_servico)
    return db_servico

# Put servicos

@router.put("/servicos/{id_servico}", response_model=schemas.ServicoPublicoOut)
def atualizar_servico(id_servico: int, dados: schemas.ServicoPublicoCreate, db: Session = Depends(get_db)):
    servico = db.query(models.ServicoPublico).get(id_servico)
    if not servico:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")
    for campo, valor in dados.model_dump().items():
        setattr(servico, campo, valor)
    db.commit()
    db.refresh(servico)
    return servico

# Delete servicos

@router.delete("/servicos/{id_servico}")
def deletar_servico(id_servico: int, db: Session = Depends(get_db)):
    servico = db.query(models.ServicoPublico).get(id_servico)
    if not servico:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")
    db.delete(servico)
    db.commit()
    return {"detail": "Serviço deletado com sucesso"}