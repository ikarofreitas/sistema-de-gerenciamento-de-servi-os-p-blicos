# postgres-python-connect

API desenvolvida com **FastAPI** e **PostgreSQL** para gerenciamento de usuários e serviços públicos.

## 🔧 Configuração do Ambiente

### 1. Crie e ative o ambiente virtual

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
2. Instale as dependências
pip install -r requirements.txt
3. Configure o PostgreSQL
Certifique-se de que o PostgreSQL está rodando.

Crie um banco de dados para a aplicação.

No arquivo database.py, configure os dados de acesso (usuário, senha, host, porta, nome do banco).

Exemplo de string de conexão:

DATABASE_URL = "postgresql://usuario:senha@localhost:5432/nome_do_banco"
4. Rode as migrações (se necessário) ou crie as tabelas com SQLAlchemy

from models import Base
from database import engine

Base.metadata.create_all(bind=engine)
5. Inicie o servidor

uvicorn main:app --reload
6. Acesse a documentação interativa
Abra em seu navegador:
http://127.0.0.1:8000/docs
📌 Endpoints Principais
Usuários
GET /usuarios/ - Lista todos os usuários

POST /usuarios/ - Cria um novo usuário

Serviços Públicos
GET /servicos/ - Lista todos os serviços públicos

POST /servicos/ - Cria um novo serviço público

📁 Estrutura do Projeto
App/
├── main.py
├── database.py
├── models.py
├── schemas.py
├── routes/
│   ├── usuarios.py
│   └── servicos.py
└── venv/
🧪 Testes
Você pode testar os endpoints via:

Insomnia

Postman

FastAPI Docs: http://127.0.0.1:8000/docs

📋 Requisitos
Python 3.10+

PostgreSQL

FastAPI

SQLAlchemy

Uvicorn

