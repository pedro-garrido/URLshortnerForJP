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
    conectar();
    var datos = urlModel.find();
    res.render("index", { datos: datos });
});

app.get("/urlpoto", async (req, res) => {
  conectar();
  const urlShort = new urlModel({
    url: req.query.Fullurl,
  });
  await urlShort.save();
  res.redirect("/");
});


app.get("/:shortUrl", async (req, res) => {
    //encontrar el url y redirigir
    const url = await urlModel.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
        url.clicks++;
        await url.save();
        res.redirect(url.url);
    } else {
        res.send("Url no encontrada");
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
