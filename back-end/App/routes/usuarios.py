from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App import models, schemas
from App.database import SessionLocal

router = APIRouter()

# Dependecy
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

# Get usuarios

@router.get("/usuarios/", response_model=list[schemas.UsuarioOut])
def listar_usuarios(nome: str | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Usuario)
    if nome:
        query = query.filter(models.Usuario.nome.ilike(f"%{nome}%"))
    return query.all()

# Post usuarios

@router.post("/usuarios/", response_model=schemas.UsuarioOut)
def criar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = models.Usuario(**usuario.model_dump())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

# Put usuarios

@router.put("/usuarios/{id_usuario}", response_model=schemas.UsuarioOut)
def atualizar_usuario(id_usuario: int, dados: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).get(id_usuario)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    for campo, valor in dados.model_dump().items():
        setattr(usuario, campo, valor)
    db.commit()
    db.refresh(usuario)
    return usuario

# delete usuarios

@router.delete("/usuarios/{id_usuario}")
def deletar_usuario(id_usuario: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).get(id_usuario)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(usuario)
    db.commit()
    return {"detail": "Usuário deletado com sucesso"}
