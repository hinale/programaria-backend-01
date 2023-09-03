const express = require('express');
const router = express.Router();
const cors = require('cors');

const conectaBancoDeDados = require('./bancoDeDados');
conectaBancoDeDados();

const Mulher = require('./mulherModel');

const 
  app = express(),
  porta = 3333;
app.use(express.json())
app.use(cors());

async function mostraMulheres(request, response) {
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find();

    response.json(mulheresVindasDoBancoDeDados);
  } catch(erro) {
    console.log(erro)
  }
}

async function criaMulheres(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  });

  try {
    const mulherCriada = await novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch(erro) {
    console.log(erro);
  }
}

async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if(request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if(request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if(request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if(request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulherAtualizadaNoBancoDeDados);
  } catch(erro) {
    console.log(erro)
  }
}

async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);

    response.json({ messagem: "Mulher deletada com sucesso!" })
  } catch(erro) {
    console.log(erro)
  }
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}
  
app.use(router.get("/mulheres", mostraMulheres));
app.use(router.post("/mulheres", criaMulheres));
app.use(router.patch("/mulheres/:id", corrigeMulher));
app.use(router.delete("/mulheres/:id", deletaMulher));

app.listen(porta, mostraPorta);
