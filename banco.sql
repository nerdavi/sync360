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

INSERT INTO `usuarios` (`id`, `nome`, `idade`, `rua`, `bairro`, `estado`, `bio`, `imagem`) VALUES
(10, 'Kurt Cobain', 27, 'Seattle', '', 'US', 'Cantor, compositor e músico norte-americano', 'https://static.dw.com/image/17510698_804.jpg'),
(11, 'Tom Morello', 61, '', '', 'US', 'Guitarrista e compositor americano', 'https://m.media-amazon.com/images/M/MV5BMzQyNjc0NTA5Ml5BMl5BanBnXkFtZTcwNTYwMDc4Ng@@._V1_.jpg'),
(12, 'Thom Yorke', 56, '', '', 'UK', 'Músico inglês', 'https://highprofiles.info/wp-content/uploads/2016/04/Yorke-main-900x600.jpg'),
(13, 'Zack de la Rocha', 55, '', '', 'US', 'Rapper norte-americano', 'https://faroutmagazine.co.uk/static/uploads/1/2023/06/Zack-de-la-Rocha-Rage-Against-the-Machine-Far-Out-Magazine.jpg'),
(15, 'Josh Homme', 52, '', '', 'US', 'Músico norte-americano', 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisa/TFEO6Y472VH3TOM6VUZ36XIRGY.jpg'),
(16, 'David Gilmour', 79, '', '', 'UK', 'Guitarrista britânico', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRLV2d_TecYxVn-WHxQP24Xcm3gIP1JGCnufeIjzMfNisjBT8aPBgtW5yB71NGSLD2pzWcjI1trn5y3nRQHJdnOeQ'),
(17, 'Layne Staley', 35, '', '', 'US', 'Cantor-compositor americano', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT7kmrfly5Slq8H9CPlmpacP7FEAWLc41AHA&s'),
(18, 'Eddie Vedder', 60, '', '', 'UK', 'Cantor-compositor e músico americano', 'https://m.media-amazon.com/images/M/MV5BNjEyMzQyNzYzMF5BMl5BanBnXkFtZTcwODIyNTQwMw@@._V1_FMjpg_UX1000_.jpg'),
(19, 'Fred Durst', 54, '', '', 'US', 'Músico e cantor', 'https://elsewhere.scdn3.secure.raxcdn.com/images/v95000/articles/fred-durst.png'),
(20, 'John Frusciante', 55, '', '', 'US', 'Guitarrista e cantor-compositor americano', 'https://images.squarespace-cdn.com/content/v1/632518df4ea0d929925289e4/1663419316226-X3C0MQ47FKJESQ546K18/John_fruciante_2005_18_090.jpg?format=1500w'),
(21, 'Chino Moreno', 52, '', '', 'US', 'Músico estadunidense', 'https://i.pinimg.com/474x/78/08/94/780894fda947ee09053fa0c605e8580c.jpg'),
(22, 'Mano Brown', 55, '', '', 'SP', '', 'https://cdn-images.dzcdn.net/images/artist/4fad3ae6c5e400ce672a380781c050b2/1900x1900-000000-80-0-0.jpg');