const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();

app.use(bodyParser.json());

const config = {
  user: 'sa',
  password: 'aram98',
  server: 'localhost',
  database: 'TrabalhoBackEnd',
  options: {
    encrypt: false
  }
};

sql.connect(config, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao SQL Server');
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à sua aplicação Node.js com SQL Server!');
});

app.get('/clientes', (req, res) => {
  res.send('Listagem de todos os clientes');
});

app.post('/clientes', (req, res) => {
  const { id, nome, sobrenome, email, idade } = req.body;
  if (!id || !nome || !sobrenome || !email || !idade) {
    return res.status(400).send('Todos os campos são obrigatórios para criar um cliente.');
  }
  const query = `
    INSERT INTO clientes (id, nome, sobrenome, email, idade)
    VALUES (@id, @nome, @sobrenome, @email, @idade)
  `;

  sql.query(query, {
    id: id,
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    idade: idade
  }, (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      return res.status(500).send('Erro ao inserir cliente no banco de dados.');
    }
    res.status(201).send('Novo cliente criado com sucesso.');
  });
});
app.put('/clientes/:id', (req, res) => {
  res.send('Cliente atualizado');
});

app.delete('/clientes/:id', (req, res) => {
  res.send('Cliente excluído');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
