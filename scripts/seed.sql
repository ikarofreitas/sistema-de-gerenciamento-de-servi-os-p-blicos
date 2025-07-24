-- Populando a tabela Usuario
INSERT INTO Usuario (nome, email, senha, data_nascimento, cidade, estado) VALUES
('João Silva', 'joao1@email.com', 'senha123', '2000-01-01', 'Quixadá', 'CE'),
('Maria Oliveira', 'maria2@email.com', 'senha123', '1995-05-15', 'Baturité', 'CE'),
('Carlos Souza', 'carlos3@email.com', 'senha123', '1988-03-10', 'Redenção', 'CE'),
('Ana Paula', 'ana4@email.com', 'senha123', '1992-07-20', 'Guaramiranga', 'CE'),
('Lucas Lima', 'lucas5@email.com', 'senha123', '2001-11-25', 'Mulungu', 'CE'),
('Fernanda Costa', 'fernanda6@email.com', 'senha123', '1999-06-30', 'Aracoiaba', 'CE'),
('Bruno Rocha', 'bruno7@email.com', 'senha123', '1985-02-28', 'Itapiúna', 'CE'),
('Juliana Alves', 'juliana8@email.com', 'senha123', '1990-10-12', 'Ibaretama', 'CE'),
('Paulo Henrique', 'paulo9@email.com', 'senha123', '2002-04-17', 'Banabuiú', 'CE'),
('Beatriz Mendes', 'beatriz10@email.com', 'senha123', '1997-08-08', 'Quixeramobim', 'CE');

-- Populando a tabela Orgao_Responsavel
INSERT INTO Orgao_Responsavel (nome_orgao, esfera, contato) VALUES
('Secretaria Municipal de Saúde de Quixadá', 'Municipal', '(88) 99999-0001'),
('Prefeitura de Baturité', 'Municipal', '(88) 99999-0002'),
('Secretaria de Educação de Redenção', 'Municipal', '(88) 99999-0003'),
('Polícia Civil de Guaramiranga', 'Estadual', '(88) 99999-0004'),
('Hospital Regional de Mulungu', 'Estadual', '(88) 99999-0005'),
('Prefeitura de Aracoiaba', 'Municipal', '(88) 99999-0006'),
('Delegacia de Itapiúna', 'Estadual', '(88) 99999-0007'),
('Secretaria de Saúde de Ibaretama', 'Municipal', '(88) 99999-0008'),
('Prefeitura de Banabuiú', 'Municipal', '(88) 99999-0009'),
('Secretaria de Educação de Quixeramobim', 'Municipal', '(88) 99999-0010');

-- Populando a tabela Servico_Publico
INSERT INTO Servico_Publico (nome, horario_funcionamento, telefone, id_orgao, rua, bairro, estado, cep, latitude, longitude) VALUES
('Hospital Municipal de Quixadá', '24h', '(88) 98888-0001', 1, 'Rua das Flores', 'Centro', 'Quixadá', '63900-000', -4.969537, -39.023853),
('Escola Básica de Baturité', '07h às 17h', '(88) 98888-0002', 2, 'Av. Central', 'Bairro Novo', 'Baturité', '62760-000', /*latitude*/, /*longitude*/),
('Posto de Saúde de Redenção', '08h às 16h', '(88) 98888-0003', 3, 'Rua da Paz', 'Vila União', 'Redenção', '62790-000', -6.704034, -38.631231),
('Delegacia de Guaramiranga', '24h', '(88) 98888-0004', 4, 'Rua Verde', 'Centro', 'Guaramiranga', '62766-000', -4.265288, -39.076851),
('Hospital de Mulungu', '24h', '(88) 98888-0005', 5, 'Rua do Sol', 'Alto Alegre', 'Mulungu', '62764-000', -4.457282, -38.963975),
('Escola Municipal de Aracoiaba', '07h às 17h', '(88) 98888-0006', 6, 'Rua Principal', 'São João', 'Aracoiaba', '62750-000', -4.249497, -38.782036),
('Delegacia de Itapiúna', '24h', '(88) 98888-0007', 7, 'Rua Nova', 'Centro', 'Itapiúna', '62740-000', -4.169705, -38.951469),
('Posto de Saúde de Ibaretama', '08h às 16h', '(88) 98888-0008', 8, 'Rua Velha', 'Planalto', 'Ibaretama', '63970-000', -4.100834, -39.029317),
('Escola Técnica de Banabuiú', '07h às 18h', '(88) 98888-0009', 9, 'Av. Beira Rio', 'Cohab', 'Banabuiú', '63960-000', -5.288473, -39.053472),
('Posto de Saúde Central de Quixeramobim', '07h às 17h', '(88) 98888-0010', 10, 'Rua Esperança', 'Boa Vista', 'Quixeramobim', '63800-000', -5.207837, -39.307582);

-- Populando a tabela Hospital
INSERT INTO Hospital (id_servico, numero_de_leitos, tem_emergencia) VALUES
(1, 100, true),
(5, 80, true);

-- Populando a tabela Escola
INSERT INTO Escola (id_servico, nivel_ensino, numero_de_vagas) VALUES
(2, 'Fundamental', 400),
(6, 'Médio', 300),
(9, 'Técnico', 250);

-- Populando a tabela Delegacia
INSERT INTO Delegacia (id_servico, tipo, tem_24h) VALUES
(4, 'Civil', true),
(7, 'Militar', true);

-- Populando a tabela Posto_de_Saude
INSERT INTO Posto_de_Saude (id_servico, atendimento_familiar, tem_farmacia) VALUES
(3, true, true),
(8, false, true),
(10, true, false);

-- Populando a tabela Avaliacao
INSERT INTO Avaliacao (nota, comentario, data, id_usuario, id_servico) VALUES
(8, 'Bom atendimento', CURRENT_DATE, 1, 3),
(10, 'Ótimo hospital!', CURRENT_DATE, 2, 1),
(7, 'Demora um pouco', CURRENT_DATE, 3, 3),
(9, 'Muito bem estruturado', CURRENT_DATE, 4, 2),
(6, 'Precisa melhorar a limpeza', CURRENT_DATE, 5, 5),
(10, 'Atendimento excelente!', CURRENT_DATE, 6, 10),
(8, 'Funcionários atenciosos', CURRENT_DATE, 7, 4),
(7, 'Faltam materiais', CURRENT_DATE, 8, 8),
(9, 'Boa escola', CURRENT_DATE, 9, 6),
(8, 'Bem localizado', CURRENT_DATE, 10, 7);

-- Populando a tabela Denuncia
INSERT INTO Denuncia (descricao, tipo_problema, data, id_usuario, id_servico) VALUES
('Falta de médicos', 'Saúde', CURRENT_DATE, 1, 3),
('Fila longa', 'Atendimento', CURRENT_DATE, 2, 3),
('Vazamento de água', 'Infraestrutura', CURRENT_DATE, 3, 5),
('Iluminação ruim', 'Segurança', CURRENT_DATE, 4, 4),
('Mau cheiro', 'Higiene', CURRENT_DATE, 5, 5),
('Atendimento demorado', 'Serviço', CURRENT_DATE, 6, 8),
('Equipamentos quebrados', 'Equipamento', CURRENT_DATE, 7, 10),
('Poucos professores', 'Educação', CURRENT_DATE, 8, 2),
('Violência escolar', 'Segurança', CURRENT_DATE, 9, 6),
('Insegurança à noite', 'Segurança', CURRENT_DATE, 10, 7);
