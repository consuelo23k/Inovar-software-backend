const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Caminho do JSON de funcionários
const funcionariosFile = path.join(__dirname, "funcionarios.json");

// Função para ler funcionários do JSON
function lerFuncionarios() {
  if (!fs.existsSync(funcionariosFile)) return [];
  const data = fs.readFileSync(funcionariosFile, "utf-8");
  return JSON.parse(data);
}

// Função para salvar funcionários no JSON
function salvarFuncionarios(funcionarios) {
  fs.writeFileSync(
    funcionariosFile,
    JSON.stringify(funcionarios, null, 2),
    "utf-8"
  );
}

// 👉 Cadastrar funcionário
router.post("/cadastrar", (req, res) => {
  const { nome, email, profissao, experiencia, senha, foto } = req.body;

  if (!nome || !email || !profissao || !experiencia || !senha) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  const funcionarios = lerFuncionarios();

  // Checar se email já existe
  if (funcionarios.find((f) => f.email === email)) {
    return res.status(400).json({
      success: false,
      message: "Funcionário com este email já existe.",
    });
  }

  const novoFuncionario = { nome, email, profissao, experiencia, senha, foto };
  funcionarios.push(novoFuncionario);
  salvarFuncionarios(funcionarios);

  res.json({ success: true, message: "Funcionário cadastrado com sucesso!" });
});

// 👉 Listar todos os funcionários
router.get("/", (req, res) => {
  const funcionarios = lerFuncionarios();
  res.json(funcionarios);
});

// 👉 Buscar funcionário por email
router.get("/:email", (req, res) => {
  const funcionarios = lerFuncionarios();
  const funcionario = funcionarios.find((f) => f.email === req.params.email);

  if (!funcionario) {
    return res
      .status(404)
      .json({ success: false, message: "Funcionário não encontrado." });
  }

  res.json(funcionario);
});

// 👉 Deletar funcionário por email
router.delete("/:email", (req, res) => {
  let funcionarios = lerFuncionarios();
  const inicialLength = funcionarios.length;

  funcionarios = funcionarios.filter((f) => f.email !== req.params.email);

  if (funcionarios.length === inicialLength) {
    return res
      .status(404)
      .json({ success: false, message: "Funcionário não encontrado." });
  }

  salvarFuncionarios(funcionarios);
  res.json({ success: true, message: "Funcionário removido com sucesso." });
});

module.exports = router;
