import { Producto } from '../models/productos.js';

export class ProductDao {

    // Obtener todos los productos paginados
    static paginado = async (filtro, opciones) => {
        try {
            const paginado= await Producto.paginate(filtro, opciones);
            return paginado   
        } catch (error) {
            throw new Error(`Error al obtener los productos paginados: ${error.message}`);
        }
    };

    // Obtener todas las categorías de productos
    static obtenerCategorias = async () => {
        try {
            const categoriasProductos = await Producto.aggregate([
                { $group: { _id: "$category" } }
            ]);

            return categoriasProductos;
        } catch (error) {
            throw new Error(`Error al obtener las categorías de productos: ${error.message}`);
        }
    };

    // Obtener un producto por ID
    static obtenerProductoPorId = async (productoId) => {
        try {
            const productoPorId = await Producto.findById(productoId);

            if (!productoPorId) {
                throw new Error('El producto buscado no existe en la base de datos');
            }

            return productoPorId;
        } catch (error) {
            throw new Error(`Error al obtener el producto por ID: ${error.message}`);
        }
    };

    // Crear un nuevo producto
        static crearProducto = async (nuevoProductoData) => {
        try {
            const nuevoProducto = await Producto.create(nuevoProductoData);
            return nuevoProducto;
        } catch (error) {
            throw new Error(`Error al crear un nuevo producto: ${error.message}`);
        }
    };

    // Actualizar un producto por ID
    static actualizarProducto = async (productoId, newData) => {
        try {
            if (newData.code) {
                throw new Error('No se puede modificar el código del producto');
            }

            const updProducto = await Producto.findByIdAndUpdate(
                productoId,
                { $set: newData },
                { new: true }
            );

            if (!updProducto) {
                throw new Error(`El producto con id ${productoId} no se encontró`);
            }

            return updProducto;
        } catch (error) {
            throw new Error(`Error al actualizar el producto por ID: ${error.message}`);
        }
    };

    // Eliminar un producto por ID
    static  eliminarProducto = async (productoId) => {
        try {
            const delProducto = await Producto.findByIdAndDelete(productoId);

            if (!delProducto) {
                throw new Error(`El producto con id ${productoId} no se encontró`);
            }

            return delProducto;
        } catch (error) {
            throw new Error(`Error al eliminar el producto por ID: ${error.message}`);
        }
    };

}