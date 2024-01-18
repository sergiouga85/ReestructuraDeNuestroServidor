import { Carrito } from '../models/carritos.js';


export class CartDao {

// Obtener todos los carritos
  static obtenerCarritos = async () => {
    try {
        const carritos = await Carrito.find().populate('carrito.productID');
        return carritos;
    } catch (error) {
        throw new Error(`Error al obtener los carritos: ${error.message}`);
    }
  };

// Obtener un carrito por ID
  static obtenerCarritoPorId = async (carritoId) => {
    try {
        const carritoPorId = await Carrito.findById(carritoId).populate('carrito.productID');
        if (!carritoPorId) {
            throw new Error('El carrito buscado no existe en la base de datos');
        }
        return carritoPorId;
    } catch (error) {
        throw new Error(`Error al obtener el carrito por ID: ${error.message}`);
    }
  };

// Crear un nuevo carrito
  static crearCarrito = async (nuevoCarritoData) => {
    try {
        const newCarrito = await Carrito.create(nuevoCarritoData);
        return newCarrito;
    } catch (error) {
        throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
    }
  };

// Actualizar la cantidad de un producto en el carrito
  static actualizarCantidadProductoEnCarrito = async (carritoId, productoId, nuevaCantidad) => {
    try {
        const producto = await Carrito.findByIdAndUpdate(
            carritoId,
            { $set: { "carrito.$[elem].cant": nuevaCantidad }},
            { arrayFilters: [{ "elem._id": productoId }]},
            { new: true }
        );
        return producto;
    } catch (error) {
        throw new Error(`Error al actualizar la cantidad del producto en el carrito: ${error.message}`);
    }
  };

// Añadir un producto al carrito o incrementar la cantidad si ya existe
  static agregarProductoAlCarrito = async (carritoId, productoId) => {
    try {
        const productExist = await Carrito.find({
            _id: carritoId,
            carrito: { $elemMatch: { productID: productoId } }
        });

        if (productExist.length > 0) {
            // Producto ya existe en el carrito, incrementar cantidad
            const updProduct = await Carrito.findByIdAndUpdate(
                carritoId,
                { $inc: { "carrito.$[elem].cant": 1 }},
                { arrayFilters: [{ "elem.productID": productoId }]},
                { new: true }
            );
            return updProduct;
        } else {
            // Añadir nuevo producto al carrito
            const addProduct = await Carrito.findByIdAndUpdate(
                carritoId,
                { $push: { carrito: { productID: productoId, cant: 1 } } },
                { new: true }
            ).lean();
            return addProduct;
        }
    } catch (error) {
        throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  };

// Eliminar un carrito por ID
  static eliminarCarrito = async (carritoId) => {
    try {
        const delCarrito = await Carrito.findByIdAndDelete(carritoId, { new: true });
        if (!delCarrito) {
            throw new Error(`El carrito con ID ${carritoId} no existe`);
        }
        return delCarrito;
    } catch (error) {
        throw new Error(`Error al eliminar el carrito por ID: ${error.message}`);
    }
  };

// Eliminar un producto del carrito por ID
  static eliminarProductoDelCarrito = async (carritoId, productoId) => {
    try {
        const delProdInCarrito = await Carrito.findByIdAndUpdate(
            carritoId,
            { $pull: { carrito: { _id: productoId } } },
            { new: true }
        );
        if (!delProdInCarrito) {
            throw new Error(`El producto con ID ${productoId} no existe en el carrito ${carritoId}`);
        }
        return delProdInCarrito;
    } catch (error) {
        throw new Error(`Error al eliminar el producto del carrito por ID: ${error.message}`);
    }
  };
}