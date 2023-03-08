
import {promises as fs} from 'fs'

class Product {
    constructor(title, description, price, thumbnail, stock, code, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.id = id;
        this.stock = stock;
        this.status = true
    }
}

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct (title, description, price, thumbnail, stock, code) {
        try{
            let valid  = [title, description, price, stock, code]
            const read = await fs.readFile(this.path, "utf8");
            const data = JSON.parse(read);
            const objCode = data.find((product) => product.code == code);
            let id

            if(objCode){
                throw error;
            }else{
                if(valid.includes(null) || valid.includes("") || valid.includes(undefined)){
                    console.log("Todos los campos deben estar completos");
                }else{
                    data.length > 0 ? id=data[parseInt(data.length) - 1].id + 1 : id = 1
                    let nuevoProducto = new Product(title, description, price, thumbnail ?? "sin img", stock, code,id);
                    data.push(nuevoProducto);
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    return (`El Producto: ${nuevoProducto} se creo con exito`)

                }
            }
        }catch (error){
            console.log("El code del producto ya se encuentra en uso" + error);
        };
    }

        getProducts = async () => {
            try {
                const read = await fs.readFile(this.path, 'utf-8')
                const prods = await JSON.parse(read)
                if (prods.length != 0) {
                    return prods
                } 
            } catch {
                await this.createJson();
                await this.createProducts();
                return "Productos iniciales creados."
            }
        }

        getProductById = async (id) => {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const findProduct = prods.find((prod) => prod.id === parseInt(id));
            if (findProduct) {
                console.log("Se ha encontrado el siguiente producto:")
                return findProduct;
            } else {
                return console.log("Product Not found");
            }
        }

        updateProduct = async (id, {title, description, price, code, stock, category, status, thumbnail}) => {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if(prods.some(prod => prod.id === parseInt(id))) {
                let index= prods.findIndex(prod => prod.id === parseInt(id))
                prods[index].title = title
                prods[index].description = description
                prods[index].price = price
                prods[index].code = code
                prods[index].stock = stock
                prods[index].category = category
                prods[index].status = status
                prods[index].thumbnail = thumbnail
                await fs.writeFile(this.path, JSON.stringify(prods))
                return "Producto actualizado" 
            }else{
                return "Producto no encontrado"
            }
        }    
            

        deleteProduct = async (id) => {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if(prods.some(prod => prod.id === parseInt(id))) {
                const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
                await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
                return "Producto eliminado"
            } else {
                return "Producto no encontrado"
            }
        }
    }
    
export default ProductManager