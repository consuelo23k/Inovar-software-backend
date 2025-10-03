const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const funcionariosRoutes = require("./funcionarios"); // importa o arquivo

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Usuários de login fixos (pode trocar para ler do banco depois)
let users = [{ usuario: "admin", senha: "1234" }];

// Rota de login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  const user = users.find((u) => u.usuario === usuario && u.senha === senha);
  res.json({ autenticado: !!user });
});

// Usa as rotas de funcionários
app.use("/funcionarios", funcionariosRoutes);

// Inicia o servidor
app.listen(3001, () => {
  console.log("🚀 API rodando em http://localhost:3001");
});
