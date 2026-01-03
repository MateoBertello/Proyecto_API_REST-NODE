import express from 'express';

import * as controlador from '../controllers/controlador.mjs';


const router = express.Router();

router.get('/productos', controlador.traerProductos);
router.get('/productos/buscar', controlador.filtrarProductos);
router.post('/productos', controlador.crearProducto);
router.put('/productos/:id', controlador.modificarProducto);
router.delete('/productos/:id', controlador.eliminarProducto);
router.get('/categoria', controlador.traerCategorias);

export default router;


