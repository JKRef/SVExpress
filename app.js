const express = require('express');
const ProductManager = require('./ProductManager.js');
const app = express();
const PORT = 8080;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log("servidor escuchando en puerto ${PORT}");
});

server.on('error', err => console.log("error: ${err}"));

const products = new ProductManager('productos.json');

app.get('/productos', async (req, res) => {
    const productos = await products.getProduct();
    res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
    const productos = await products.getProduct();
    let numeroRandom = Math.floor(Math.random() * productos.legth);
    res.send(productos[numeroRandom]);
});