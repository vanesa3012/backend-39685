
import {promises as fs} from "fs"

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.addId()
    }

}


class ProductManager{
    constructor(path){
        this.path = path
    }
    
    // METODOS

    async addProduct(newProduct){       //Valido que estén todos los campos completos
        try{
            const read = await fs.readFile(this.path, "utf8")
            const data = JSON.parse(read)
            const sameCode = data.find((prod) => prod.code === newProduct.code)
            if(sameCode){
                throw error;
            }else{
                if(valid.includes(null)||valid.includes("")||valid.includes(undefined)){
                    console.log("Todos los campos deben estar completos");
                }else{
                    let id = data.length + 1;
                    let nuevoProducto = new Product(titulo, descripcion, precio, imagen, stock, code, id);
                    data.push(nuevoProducto);
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                }
            }
        }catch (error){
            console.log(error);
        }
    }


    async getProducts() {
        try {
        const read = await fs.readFile(this.path, "utf8");
        return (JSON.parse(read)); 
        } catch (error) {
        throw error;
        }
    }

    async getProductByID(id) {
        try {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const product = data.find((product) => product.id === id);
        if (product) {
            return (product);
        } else {
            return ("El id seleccionado no corresponde a ninguno de nuestros productos");
        }
        } catch (error) {
        throw error;
        }
    }

    async updateProduct(id, titulo, descripcion, precio, imagen, stock, code) {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        if (data.some(producto => producto.id === id)){
            let indice = data.findIndex(producto => producto.id === id)
            data[indice].title      = titulo
            data[indice].description= descripcion
            data[indice].price      = precio
            data[indice].thumbnail  = imagen 
            data[indice].code       = code
            data[indice].stock      = stock
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }else{
            return "producto no encontrado";
        }
    }
    
    async deleteProduct(id) {
        try {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const newData = data.filter((product) => product.id !== id);
            await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
        return console.log("Producto eliminado");
        } catch (error) {
        throw error;
        }
    }

}

export default ProductManager