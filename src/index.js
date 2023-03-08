import express from "express";
import routerProduct from "./routes/productos.routes.js";
import routerCart from "./routes/carritos.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer'
import { engine } from "express-handlebars";
import * as path from 'path'
import { Server } from "socket.io"; 
import routerSocket from "./routes/sockets.routes.js";
import { ProductManager } from "./controllers/ProductManager.js";

const productManager = new ProductManager('src/models/productos.json')

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

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Server de socket io
const io = new Server(server) //servidor del lado del backend

io.on("connection",async (socket)=>{ //io.on es cuando se establece la coneccion

    socket.on("AddProduct", async info => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        console.log(info);
        let title =info.title
        let description =info.description
        let price =info.price
        let thumbnail =info.thumbnail
        let stock =info.stock
        let code =info.code
        let nuevoProduct = await productManager.addProduct(title, description, price, thumbnail, stock, code);
        socket.emit("confirmacionAdd",nuevoProduct)
    })

    socket.on("EliminarProduct", async id => { 
        let productoBorrado = await productManager.deleteProduct(id) 
        socket.emit("confirmacionBorrado",productoBorrado)
    })

    socket.emit("getProducts",  await productManager.getProducts()); //emito info desde mi servidor
})

//Middleware son intermediarios
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


//Routes
app.use('/', express.static(__dirname + '/public'))
//app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.post('/upload', upload.single('producto'), (req, res)=>{
    res.send("Imagen cargada")
})

//HANDLEBERS
app.use('/', routerSocket)

/*app.get('/', (req, res) =>{
    const user = {
        nombre: "Pablo",
        email: "pal@l.com",
        rol: "Tutor"
    }
        res.render("home",{ 
        titulo: "Nube Lila",                         //Renderizar el siguiente contenido
        mensaje: "Vanesa",
        usuario: user,
        isTutor: user.rol === "Tutor" 
    })
})*/

