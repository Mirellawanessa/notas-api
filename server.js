const express = require('express');
const mongoose = require('mongoose');
const Nota = require('./models/Nota');

const app = express();
app.use(express.json()); // Para parsear JSON no corpo da requisição

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost/notas-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.log('Erro ao conectar ao MongoDB', err));

// Rotas da API

// Criar uma nota
app.post('/notas', async (req, res) => {
  const { titulo, conteudo } = req.body;
  const nota = new Nota({ titulo, conteudo });

  try {
    await nota.save();
    res.status(201).json(nota);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todas as notas
app.get('/notas', async (req, res) => {
  try {
    const notas = await Nota.find();
    res.status(200).json(notas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar uma nota
app.put('/notas/:id', async (req, res) => {
  try {
    const nota = await Nota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nota) return res.status(404).json({ error: 'Nota não encontrada' });
    res.status(200).json(nota);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar uma nota
app.delete('/notas/:id', async (req, res) => {
  try {
    const nota = await Nota.findByIdAndDelete(req.params.id);
    if (!nota) return res.status(404).json({ error: 'Nota não encontrada' });
    res.status(200).json({ message: 'Nota deletada com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
