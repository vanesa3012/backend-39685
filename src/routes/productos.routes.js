import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";


const routerProduct = Router()
const productManager = new ProductManager('src/models/productos.json')

routerProduct.get('/', async (req, res) => { 
    const products = await productManager.getProducts();
    let limit  =parseInt(req.query.limit);
    let data;
    console.log(limit)
    if (limit) {
        if(limit < 0 || limit > products.length){
            data=`el limite debe ser un numero positivo y menor al numero ${products.length}`
        }else{data = products.slice(0, limit);}
    } else {
        data = products;
    }
    res.send(data);
})

routerProduct.get('/:id', async (req, res) => { 
    const producto = await productManager.getProductById(req.params.id)
    console.log(producto)
    res.send(JSON.stringify(producto))
})

routerProduct.post('/', async (req, res) => { 
    let mensaje = await productManager.addProduct(req.body)
    res.send(mensaje)
})

routerProduct.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})

routerProduct.put('/:id', async (req, res) => { 
    let mensaje = await productManager.updateProduct(req.params.id, req.body)
    res.send(mensaje)
})

export default routerProduct