const mongoose = require('mongoose');

const NotaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  conteudo: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Nota', NotaSchema);
