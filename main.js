//express servidor web
const express = require("express");
const app = express();
//morgan middleware para mostrar peticiones en consola
const morgan = require("morgan");
const { conectar, urlModel } = require("./models/urlSchema");
//puerto
const port = process.env.PORT || 3000;

//definimos el motor de renderizado
app.set("view engine", "ejs");
//establecemos el middleware
app.use(morgan("dev"));

//establecemos las rutas
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/urlpoto", async (req, res) => {
  conectar();
  const urlShort = new urlModel({
    url: req.query.url,
  });
  await urlShort.save();
  res.send(req.query.Fullurl);
});


app.get("/:shortUrl", async (req, res) => {
    //encontrar el url y redirigir
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
