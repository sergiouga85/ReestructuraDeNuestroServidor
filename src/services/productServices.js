import {ProductDao} from '../dao/productDao.js';

export class ProductService{

   static crearProducto = async (nuevoProductoData) => {
        try {
            // Validar que el precio del nuevo producto no sea negativo
            if (nuevoProductoData.price < 0) {
                throw new Error('El precio del producto no puede ser negativo.');
            }

            // Luego, creas el producto usando el DAO
            return await ProductDao.crearProducto(nuevoProductoData);
        } catch (error) {
            throw new Error(`Error en el servicio de productos: ${error.message}`);
        }
    };
}