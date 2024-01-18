import { Router } from 'express';
import { obtenerProductos, obtenerCategorias, obtenerProductoPorId,crearProducto,actualizarProducto,eliminarProducto} from '../../controllers/products.controllers.js';

export const productosRouter = Router();

productosRouter.get('/', obtenerProductos);
productosRouter.get('/cat/', obtenerCategorias);
productosRouter.get('/:pid', obtenerProductoPorId);
productosRouter.post('/', crearProducto);
productosRouter.put('/:pid', actualizarProducto);
productosRouter.delete('/:pid', eliminarProducto);