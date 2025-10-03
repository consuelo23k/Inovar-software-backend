const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [{ usuario: "admin", senha: "1234" }];

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  const user = users.find((u) => u.usuario === usuario && u.senha === senha);
  console.log(JSON.stringify(users));
  console.log(JSON.stringify(req.body));
  if (user) {
    res.json({ autenticado: true, message: "Login bem-sucedido!" });
  } else {
    res.json({ autenticado: false, message: "Usuário ou senha inválidos." });
  }
});

app.listen(3001, () => {
  console.log("API rodando em http://localhost:3001");
});
