-- Criando tabela usuário
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cidade VARCHAR(100),
    estado VARCHAR(100)
);

-- Criando tabela Avaliação
CREATE TABLE Avaliacao (
    id_avaliacao SERIAL PRIMARY KEY,
    nota INTEGER NOT NULL CHECK (nota BETWEEN 0 AND 10),
    comentario TEXT,
    data DATE NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_servico INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_servico) REFERENCES Servico_Publico(id_servico)
);

-- Criando tabela Denúncia
CREATE TABLE Denuncia (
    id_denuncia SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    tipo_problema VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_servico INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_servico) REFERENCES Servico_Publico(id_servico)
);

-- Criando tabela Órgão Responsável
CREATE TABLE Orgao_Responsavel (
    id_orgao SERIAL PRIMARY KEY,
    nome_orgao VARCHAR(100) NOT NULL,
    esfera VARCHAR(50),
    contato VARCHAR(100)
);

-- Criando tabela Serviço Público
CREATE TABLE Servico_Publico (
    id_servico SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    horario_funcionamento VARCHAR(100),
    telefone VARCHAR(50),
    rua VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    cep VARCHAR(20)
    id_orgao INTEGER,
    FOREIGN KEY (id_orgao) REFERENCES Orgao_Responsavel(id_orgao)
);

-- Especialização de Serviço Público: Hospital
CREATE TABLE Hospital (
    id_servico INTEGER PRIMARY KEY,
    numero_de_leitos INTEGER,
    tem_emergencia BOOLEAN,
    FOREIGN KEY (id_servico) REFERENCES Servico_Publico(id_servico)
);

-- Especialização de Serviço Público: Delegacia
CREATE TABLE Delegacia (
    id_servico INTEGER PRIMARY KEY,
    tipo VARCHAR(50),
    tem_24h BOOLEAN,
    FOREIGN KEY (id_servico) REFERENCES Servico_Publico(id_servico)
);

-- Especialização de Serviço Público: Escola
CREATE TABLE Escola (
    id_servico INTEGER PRIMARY KEY,
    nivel_ensino VARCHAR(50),
    numero_de_vagas INTEGER,
    FOREIGN KEY (id_servico) REFERENCES Servico_Publico(id_servico)
);

-- Especialização de Serviço Público: Posto de Saúde
CREATE TABLE Posto_de_Saude (
    id_servico INTEGER PRIMARY KEY,
    atendimento_familiar BOOLEAN,
    tem_farmacia BOOLEAN,
    FOREIGN KEY (id_servico) REFERENCES Servico_Publico(id_servico)
);