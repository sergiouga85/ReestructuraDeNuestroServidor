import { Router } from 'express';
import { obtenerCarritos, obtenerCarritoPorId, crearCarrito, actualizarCantidadProductoEnCarrito,agregarProductoAlCarrito,eliminarCarrito,eliminarProductoDelCarrito} from '../../controllers/carts.controllers.js'

export const carritoRouter = Router();

carritoRouter.get('/', obtenerCarritos);
carritoRouter.get('/:cid', obtenerCarritoPorId);
carritoRouter.post('/', crearCarrito);
carritoRouter.put('/:cid/producto/:pid', actualizarCantidadProductoEnCarrito);
carritoRouter.put('/:cid/add/:pid', agregarProductoAlCarrito);
carritoRouter.delete('/:cid', eliminarCarrito);
carritoRouter.delete('/:cid/producto/:pid', eliminarProductoDelCarrito);
