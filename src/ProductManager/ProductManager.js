import fs from 'fs';


const exitosamente = 'exitosamente';
const error = 'Error';

export default class ProductManager {
    #ruta
    constructor(ruta) {
        this.#ruta = ruta
    }

    async readingJSON(){
        try {
            const data = await fs.promises.readFile(this.#ruta, 'utf-8');
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } 
        catch (error) {
            console.log(error);
        }
    }
    async fileSaving(item){
        try {
            const dataJSON = JSON.stringify(item);
            await fs.promises.writeFile(this.#ruta, dataJSON);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async addProducts(item){
        try {
            const products = await this.readingJSON();
            if(products.length){
                if(products.find( element => element.code === item.code )){
                    return console.log('Ya esta agregado')
                } else {
                    let lastIndex = products.length - 1;
                    let lastId = products[lastIndex].id;
                    item.id = lastId + 1;
                    let id = item.id;
                    products.push(item);
                    this.fileSaving(products);
                    console.log('Producto agregado',exitosamente)
                    return id;
                }
            } else {
                item.id = 1;
                products.push(item);
                this.fileSaving(products);
                console.log('Producto agregado',exitosamente)
            }
    
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProducts(){
        try {
            const product = await this.readingJSON();
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProductsById(id){
        try {
            const product = await this.readingJSON();
            let productById;
            product.map(item => {
                item.id === id && (productById = item);
            });
            return productById;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(item){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(product => product.id === item.id)
            if(productId >= 0){
                product[productId] = item
                await this.fileSaving(product);
                console.log('Actualizado', exitosamente);
            } else {
                console.log(error);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(item => item.id === id);
            if(productId >= 0) {
                product.splice(1, productId);
                await this.fileSaving(product);
                console.log('Producto eliminado', exitosamente);
            } else {
                console.log(error);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
}