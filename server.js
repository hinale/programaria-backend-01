const express = require('express');

const 
  app = express(),
  porta = 3333;

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}
  
app.listen(porta, mostraPorta)
