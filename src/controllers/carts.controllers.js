import { CartDao } from '../dao/cartDao.js';
import {CartService} from '../services/cartServices.js';

// Obtener todos los carritos
export const obtenerCarritos = async (req, res) => {
    try {
        const carritos = await CartDao.obtenerCarritos();
        res.json(carritos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un carrito por ID
export const obtenerCarritoPorId = async (req, res) => {
    try {
        const carritoPorId = await CartDao.obtenerCarritoPorId(req.params.cid);
        res.json(carritoPorId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo carrito
export const crearCarrito = async (req, res) => {
    try {
        const newCarrito = await CartDao.crearCarrito(req.body);
        res.status(201).json(newCarrito);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Actualizar la cantidad de un producto en el carrito
export const actualizarCantidadProductoEnCarrito = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { nuevaCantidad } = req.body;

        // Validar que la nueva cantidad sea un número válido y no sea negativa
        const cantidadNumerica = parseInt(nuevaCantidad);
        if (isNaN(cantidadNumerica) || cantidadNumerica < 0) {
            return res.status(400).json({ message: 'La nueva cantidad debe ser un número válido y no puede ser negativa.' });
        }

        // Llamar al servicio para actualizar la cantidad
        const productoActualizado = await CartService.actualizarCantidadProductoEnCarrito(cid, pid, cantidadNumerica);
        res.status(201).json({ message: 'Producto Actualizado en el Carrito', info: productoActualizado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Añadir un producto al carrito o incrementar la cantidad si ya existe
export const agregarProductoAlCarrito = async (req, res) => {
    try {
        const producto = await CartDao.agregarProductoAlCarrito(req.params.cid, req.params.pid);
        res.status(201).json({ message: 'Producto Agregado', info: producto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un carrito por ID
export const eliminarCarrito = async (req, res) => {
    try {
        const delCarrito = await CartDao.eliminarCarrito(req.params.cid);
        res.status(201).json({ message: 'Carrito Eliminado', info: delCarrito });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const eliminarProductoDelCarrito = async (req, res) => {
    try {
        const delProdInCarrito = await CartDao.eliminarProductoDelCarrito(req.params.cid, req.params.pid);
        res.status(201).json({ message: 'Producto Eliminado del carrito', info: delProdInCarrito });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};