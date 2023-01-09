// Imports
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

// Config
// Template Engine
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", function (req, res) {
  Post.findAll().then(function (posts) {
    res.render("home", { posts: posts });
  });
});

/* Renderiza formulário */
app.get("/cad", function (req, res) {
  /* res.send("hello from simple server :)"); */
  res.render("form");
});

/* Ao usar método POST no formulário devemos mudar de app.get para app.post */
app.post("/add", (req, res) => {
  // Pegar dados vindo do formulario
  /*   res.send("Formulário recebido" + req.body.conteudo); */

  // Método para criar usuário vindo do formulário
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(function () {
      /* res.send("Post criado com sucesso!"); */
      // Caso post for criado com sucesso então vamos redirecionar rota
      res.redirect("/");
    })
    .catch(function (err) {
      res.send("Houve um erro" + err);
    });
});

app.get("/deletar/:id", function (req, res) {
  Post.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.send("Postagem deletada com sucesso!");
    })
    .catch(function (err) {
      res.send("Esta postagem  nao existe! ");
    });
});

// Listen do servidor !deixar na ultima linha
app.listen(8081, () => {
  console.log("Servidor rodando na url: http://localhost:8081");
});
