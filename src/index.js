import ProductManager from "./ProductManager.js";
import express from "express";

const app  = express();
const PORT = 8080;
const manager= new ProductManager("./src/productos.json");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.send(`Desafio 3, server on port ${PORT}`)
});

app.get("/catalogo", async (req,res)=>{
    const products = await manager.getProducts();
    let limit = parseInt(req.query.limit);
    let data;
    console.log(limit)
    if (limit) {
        if(limit < 0 || limit > products.length){
            data=`El numero debe ser positivo y menor al numero ${products.length}`
        }else{data = products.slice(0, limit);}
    } else {
        data = products;
    }
    res.send(data);
});

app.get("/catalogo/:id", async(req,res)=>{
    const product = await manager.getProductByID(parseInt(req.params.id))
    res.send(product)
});

app.listen(PORT,()=>{
    console.log(`servidor en on port: ${PORT}`)
});