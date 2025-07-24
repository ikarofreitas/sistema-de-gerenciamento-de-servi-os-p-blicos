from fastapi import FastAPI
from App import models
from App.database import engine
from App.routes import servicos, usuarios
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5371",  # endereço do front, ajuste conforme necessário
    "http://192.168.1.4:5173",
    "http://127.0.0.1:3000",
    # coloque aqui outras origens permitidas se houver
]

# Start no servidor
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # para produção, use apenas seus domínios autorizados
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE, OPTIONS etc
    allow_headers=["*"],  # Permite qualquer header
)

# Inclui rotas 
app.include_router(usuarios.router)
app.include_router(servicos.router)