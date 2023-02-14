
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

    static addId(){
        if(this.idIncrement){
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    
    }
}


class ProductManager{
    static newId = 0
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
                    let id;
                    id = data.length + 1;
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
        console.log(JSON.parse(read)); 
        } catch (error) {
        throw error;
        }
    }

    async getProductById(id){
        try{
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const buscarProduct = data.find((buscarProduct) => buscarProduct.id === id)
        if(buscarProduct){
            console.log(buscarProduct)
        }else{
            console.log("No se encontro el producto")
        }
        }catch(error){
        throw error
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

const producto1 = new ProductManager("./productos.json")

/*console.log(producto1)

//agrego un producto con todos los campos completos
producto1.addProduct({
    title: "Frutilla suave",
    description: "Sillón",
    price: 35000,
    thumbnail:  "https://firebasestorage.googleapis.com/v0/b/nube-lila.appspot.com/o/sirosa.png?alt=media&token=76bd52f6-874b-4def-9c42-767d6fcee391", //ruta
    code: 4,
    stock: 4
})


//faltan completar campos
producto1.addProduct({
    title: "Amor por los flamencos",
    description: " ",
    price: " ",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/nube-lila.appspot.com/o/flamencos.png?alt=media&token=2a4551be-53f3-4663-926d-4b0e1e669a46",
    code: 32,
    stock: 5
})


//distinto producto pero mismo code
producto1.addProduct({
    title: "Velas de amor",
    description: "Deco navideña",
    price: 1200,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/nube-lila.appspot.com/o/velas.png?alt=media&token=a9eb87db-e00c-48e8-8652-761d0420b275",
    code: 22,
    stock: 10
})

producto1.addProduct({
    title: "Puffs divertidos",
    description: "Set de puffs",
    price: 15000,
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/nube-lila.appspot.com/o/setpuffs.png?alt=media&token=cdff7e6e-fa93-41b2-bdf8-7047a9f3ee11",
    code: 22,
    stock: 15
})

console.log(producto1)*/

producto1.getProductById(1)
producto1.getProductById(2)
producto1.getProductById(3)

