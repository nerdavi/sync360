CREATE DATABASE IF NOT EXISTS usuarios_db;
USE usuarios_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  idade INT,
  rua VARCHAR(100),
  bairro VARCHAR(100),
  estado VARCHAR(50),
  bio TEXT,
  imagem TEXT
);

INSERT INTO usuarios (nome, idade, rua, bairro, estado, bio, imagem) VALUES
('João', 25, 'Rua X', 'Bairro Y', 'CE', 'Sou um usuário exemplo.', '');
