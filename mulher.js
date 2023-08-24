const 
  express = require('express'),
  router = express.Router();

const 
  app = express(),
  porta = 3333;

function mostraMulher(request, response) {
  response.json({
    nome: "Simara Conceição",
    imagem: "https://github.com/simaraconceicao.png",
    minibio: "Desenvolvedora e instrutora"
  })
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)
