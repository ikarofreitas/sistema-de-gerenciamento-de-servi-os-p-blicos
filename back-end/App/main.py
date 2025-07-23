from fastapi import FastAPI
from App import models
from App.database import engine
from App.routes import servicos, usuarios

# Start no servidor
app = FastAPI()

# Inclui rotas 
app.include_router(usuarios.router)
app.include_router(servicos.router)