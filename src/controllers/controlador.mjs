import * as modelo from '../models/modelo.mjs';

async function traerProductos(req, res) {
    try {
        const resultado = await modelo.traerproductos();
        // El modelo ya devuelve el array limpio, verificamos si tiene datos
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json({ mensaje: 'Productos no encontrados' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function filtrarProductos(req, res) {
    try {
        // Asignación de los query params para filtrado
        const filtros = req.query; 
        const resultado = await modelo.filtrarproductos(filtros);
        
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron productos con esos filtros' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function crearProducto(req, res) {
    try {
        // Asignación desestructurante de los datos del producto
        const { nombre, descripcion, precio, stock, talla, marca, sku } = req.body;

        // Verificamos datos obligatorios (puedes ajustar cuáles son obligatorios)
        if (!nombre || !precio || !marca || !sku) {
            return res.status(400).json({ mensaje: 'Datos incompletos: nombre, precio, marca y sku son requeridos' });
        }

        const exito = await modelo.crearProducto({
            nombre,
            descripcion,
            precio,
            stock,
            talla,
            marca,
            sku
        });

        // Como el modelo retorna true/false
        if (exito) {
            res.status(201).json({ mensaje: `Producto ${nombre} dado de alta correctamente` });
        } else {
            res.status(400).json({ mensaje: 'No se pudo crear el producto' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function modificarProducto(req, res) {
    try {
        // Asignación desestructurante del ID y el Body
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, talla, marca, sku } = req.body;

        // Verificamos que venga el ID
        if (!id) {
            return res.status(400).json({ mensaje: 'Se requiere el ID del producto' });
        }

        const exito = await modelo.modificarProducto({
            id,
            nombre,
            descripcion,
            precio,
            stock,
            talla,
            marca,
            sku
        });

        // Verificamos el booleano que devuelve el modelo
        if (exito) {
            res.json({ mensaje: `Producto con ID ${id} modificado correctamente` });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado o no se pudo modificar' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function eliminarProducto(req, res) {
    try {
        // Asignación desestructurante
        const { id } = req.params;

        const exito = await modelo.eliminarProducto(id);

        if (exito) {
            res.status(200).json({ mensaje: `Producto con ID: ${id} eliminado` });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function traerCategorias(req, res) {
    try {
        const resultado = await modelo.traercategorias();
        
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron categorías' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

export { 
    traerProductos, 
    filtrarProductos, 
    crearProducto, 
    modificarProducto, 
    eliminarProducto,
    traerCategorias
};