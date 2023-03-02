import {existsSync, promises as fs} from 'fs'


class Cart {
    constructor(id, products) {
        this.id = id;
        this.products = products;
    }
}

export class CartManager{
    constructor(path){
        this.path = path
    }
}

    checkJson =() => {
    !existsSync(this.path) && fs.writeFile(this.path, "[]", 'utf-8'); }//Creamos archivo JSON.

addCart = async () => {
    this.checkJson()
    try {
        const read = await fs.readFile(this.path, 'utf-8')
        let carts = JSON.parse(read)
        let newId
        carts.length > 0 ? newId = carts[carts.length - 1].id + 1 : newId = 1;
        const nuevoCarrito = new Cart (newId, []);
        carts.push(nuevoCarrito);
        await fs.writeFile(this.path, JSON.stringify(carts))
        console.log(`Carrito: ${nuevoCarrito.id} creado`)
        return newId
    } catch {
        return "Error al crear el carrito."
    }

}

getCartById = async (idCart) => {
    this.checkJson()
    try {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        let cartIndex = carts.findIndex(cart => cart.id === idCart);

        if (carts[cartIndex]) {
            return carts[cartIndex]
        } else {
            throw `Carrito no encontrado. ${carts.id}`
        }
    } catch {
        return "Carrito no encontrado"
    }           
}

getCarts = async() => {
    const read = await fs.readFile(this.path, 'utf-8')
    const cartArray = JSON.parse(read)
    return cartArray
}

addProductToCart = async (idCart, idProduct, prodQty) => {
    this.checkJson()
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    if(carts.some(cart => cart.id === parseInt(idCart))) {  //Comprobamos que existe el carrito con ese id
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart)) //Obtenemos el índice del array de carritos
        const objetoCarrito = new Cart(idCart, carts[cartIndex].products) //Obtenemos el índice del producto dentro del carrito
        const prodIndex = objetoCarrito.products.findIndex(obj => obj.product === parseInt(idProduct))
        if(prodIndex === -1) {
            objetoCarrito.products.push({product: idProduct, quantity: prodQty}) //Si no existe agregamos el producto al array de productos dentro del carrito
            carts[cartIndex] = objetoCarrito; //Actualizamos el carrito en el array de carritos
        } else {
            carts[cartIndex].products[prodIndex].quantity += prodQty; //Si existe aumentamos la cantidad en 1
        } 
        await fs.writeFile(this.path, JSON.stringify(carts), 'utf-8') //Json del carrito con el producto nuevo
        return "Producto agregado exitosamente"
    } else {
        return "Error al agregar el producto al carrito."
    }
}

deleteCart = async (id) => {
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    if(carts.some(cart => cart.id === parseInt(id))) {
        const cartsFiltrados = carts.filter(cart => cart.id !== parseInt(id))
        await fs.writeFile(this.path, JSON.stringify(cartsFiltrados))
        return "Carrito eliminado"
    } else {
        return "Carrito no encontrado"
    }
}

deleteProductFromCart = async (idCart, idProduct) => {
    this.checkJson()
    const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    //Chequeamos que el carrito existe con ese id.
    if(carts.some(cart => cart.id === parseInt(idCart))) {
        //Obtenemos el índice del array de carritos
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
        //Obtenemos el índice del prdoucto dentro del carrito
        const objetoCarrito = new Cart(idCart, carts[cartIndex].products)
        const prodIndex = objetoCarrito.products.findIndex(obj => obj.product === parseInt(idProduct))
        if(prodIndex !== -1) {
            //Si existe eliminamos el producto del carrito
            const prodsFiltrados = objetoCarrito.products.filter(obj => obj.product !== parseInt(idProduct))
            //Actualizamos el carrito en el array de carritos
            objetoCarrito.products = prodsFiltrados;
            carts[cartIndex] = objetoCarrito;
        } else {
            return "El producto no existe en el carrito y no pudo ser eliminado."
        }
        //Escribimos el Json del carrito con el producto nuevo
        await fs.writeFile(this.path, JSON.stringify(carts), 'utf-8')
        return "Producto eliminado del carrito"
    } else {
        return "Hubo un error al eliminar el producto del carrito."
    }
}



