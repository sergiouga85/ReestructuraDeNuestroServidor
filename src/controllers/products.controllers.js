import {ProductDao} from '../dao/productDao.js';
import { Producto } from '../models/productos.js';
import  {ProductService} from '../services/productServices.js';

// Obtener todos los productos paginados
export const obtenerProductos = async (req, res) => {
    try {
        let opciones = {}
        const filtro = (!req.query.filtro) ?  '' : { category: req.query.filtro }
        const itemsPorPagina = (!req.query.itemsPorPagina) ? opciones = { limit: 10, ...opciones } : opciones = { limit: req.query.itemsPorPagina, ...opciones }
        const pagina = (!req.query.pagina) ? opciones = { page: 1, ...opciones } : opciones = { page: req.query.pagina, ...opciones }
        const orden = (!req.query.order) ? '' : opciones = { sort: { 'price': req.query.order }, ...opciones }
        console.log(opciones)
        const paginado = await ProductDao.paginado(filtro, opciones)
        console.log(paginado)
        const resoults = {
            status: 'success',
            payload: paginado.docs,
            totalPages: paginado.totalPages,
            prevPage: paginado.prevPage,
            nextPage: paginado.nextPage,
            page: paginado.page,
            hasPrevPage: paginado.hasPrevPage,
            hasNextPage: paginado.hasNextPage,
            prevLink: '',
            nextLink: ''
        }

        res.json(resoults)
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Obtener todas las categorías de productos
export const obtenerCategorias = async (req, res) => {
    try {
        const categoriasProductos = await ProductDao.obtenerCategorias();

        res.json(categoriasProductos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const productoPorId = await ProductDao.obtenerProductoPorId(req.params.pid);

        res.json(productoPorId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
        const nuevoProductoData = req.body;

        // Validar que el precio del nuevo producto no sea negativo
        if (nuevoProductoData.price < 0) {
            return res.status(400).json({ message: 'El precio del producto no puede ser negativo.' });
        }

        // Llamar al servicio para crear el producto
        const nuevoProducto = await ProductService.crearProducto(nuevoProductoData);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 



// Actualizar un producto por ID
export const actualizarProducto = async (req, res) => {
    try {
        const updProducto = await ProductDao.actualizarProducto(req.params.pid, req.body);
        res.json(updProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto por ID
export const eliminarProducto = async (req, res) => {
    try {
        const delProducto = await ProductDao.eliminarProducto(req.params.pid);
        res.json(delProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
