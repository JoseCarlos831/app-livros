require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Google Books API
const GOOGLE_BOOKS_API =  process.env.API_URL;

app.use(express.static('public'));

// Endpoint para buscar livros por título
app.get('/api/books', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${query}`);
    res.json(response.data.items || []);
  } catch (error) {
    console.error("Erro ao buscar livros:", error.message);
    res.status(500).send("Erro ao buscar livros.");
  }
});

// Endpoint para detalhes do livro por ID
app.get('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}/${bookId}`);
    res.json(response.data || {});
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error.message);
    res.status(500).send("Erro ao buscar detalhes do livro.");
  }
});

// Rota para servir a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
