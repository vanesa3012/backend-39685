import express from "express";
import routerProduct from "./routes/productos.routes.js";
import routerCart from "./routes/carritos.routes.js"
import { __dirname } from "./path.js";
import multer from 'multer'
import { ProductManager } from "./controllers/productManager.js";

const productManager = new ProductManager('src/models/productos.json');



//const upload = multer ({dest:'src/public/img'} ) //forma básica de utilizar multer

//configuración avanzada
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const app = express()
const PORT = 8080 

//Middleware son intermediarios
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)

app.post('/upload', upload.single('producto'), (req, res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})