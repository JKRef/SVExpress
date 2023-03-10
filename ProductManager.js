const fs = require('fs');


class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo
    }

    async #leerArchivo() {

        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path, 'utf-8');
                const contenidoParseado = await JSON.parse(contenido);
                return contenidoParseado;

            } else {
                fs.promises.writeFile(this.path, JSON.stringify('[]', null, '\t'));
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

    ///Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async addProduct(obj) {
        const contenidoArchivo = await this.#leerArchivo();
        if (contenidoArchivo.length !== 0) {
            await fs.promises.writeFile(this.path, JSON.stringify([...contenidoArchivo, { ...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1 }], null, 2), 'utf-8');
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify([{ ...obj, id: 1 }]), 'utf-8');
        }


    }

    ///Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getProductById(numeroId) {
        try {
            let idSeleccionado;
            let contenidoArchivo = await this.#leerArchivo();
            await contenidoArchivo.forEach(articulo => {
                if (articulo.id === numeroId) {
                    idSeleccionado = articulo;
                }
            });
            return idSeleccionado ? idSeleccionado : `No se encontro articulo con el ID: ${numeroId}`
        } catch (error) {
            console.log(error);
        }

    }

    ///Devuelve un array con los objetos presentes en el archivo.    
    async getProduct() {

        try {
            const contenidoArchivo = await this.#leerArchivo();
            return contenidoArchivo;

        } catch (error) {
            console.log(error);
        }


    }

    ///Elimina del archivo el objeto con el id buscado.
    async deleteProduct(numeroId) {
        try {
            let idSeleccionado;
            let contenidoArchivo = await this.#leerArchivo();
            await contenidoArchivo.forEach(contenido => {
                if (contenido.id === numeroId) {
                    idSeleccionado = contenido;
                }
            })
            if (idSeleccionado) {
                await contenidoArchivo.splice(contenidoArchivo.indexOf(idSeleccionado), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(contenidoArchivo, null, '\t'));
                return `Se elimino el articulo con el ID: ${numeroId}.`;
            } else {
                return `El articulo con ID: ${numeroId} no fue eliminado porque no se encontro en el archivo.`;
            }
        } catch (error) {
            console.log(error);
        }
    }

    ///Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            const contenidoArchivo = await this.#leerArchivo();
            if (contenidoArchivo.length !== 0) {
                await fs.promises.unlink(this.path)
                return 'Articulos eliminados'
            } else {
                return 'El archivo no contiene articulos'
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const contenedor = new ProductManager('./productos.json');

/* contenedor.addProduct(
    {
        title: "laptop",
        precio: '10000',
        descripcion: "Asus",
        codigo: 'AJ3498',
        stock: '45',
        thumbnail: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/latam/mx/mkt/plp/laptops/d14-amd-2021.jpg'
    }) */

/* contenedor.addProduct(
    {
        title: "Mouse",
        precio: '100',
        descripcion: "HP",
        codigo: 'AJ5632',
        stock: '21',
        thumbnail: 'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/non-braid/antivenom-g600/g600-gallery-6-nb.png?v=1'
    }) */

/* contenedor.addProduct(
    {
        title: "placa de video",
        precio: '900000',
        descripcion: "apple",
        codigo: 'AJ1209',
        stock: '15',
        thumbnail: 'https://www.venex.com.ar/products_images/1628541467_p03230_bigimage_822608a2d0905372.png'
    }) */


/* contenedor.deleteProduct(3).then(console.log) */

/* contenedor.deleteAll() */

/* contenedor.getProduct().then(console.log) */

/* contenedor.getProductById(1).then(console.log) */