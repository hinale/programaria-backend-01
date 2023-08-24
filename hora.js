const 
  express = require('express'),
  router = express.Router();

const 
  app = express(),
  porta = 3333;

function mostraHora(request, response) {
  const
    data = new Date(),
    hora = data.toLocaleTimeString("pt-br")
  response.send(hora)
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/hora", mostraHora))
app.listen(porta, mostraPorta)
