import pool from '../conexion/conexion_bd.mjs';


async function traerproductos() {
    try {
        const resultado = await pool.query('SELECT * FROM productos')
        return resultado.rows; 
    } catch (error) {
        console.log(error)
        throw error; 
        
    }
}

async function filtrarproductos(filtros = {}) {
    const condiciones = [];
    const valores = [];

    const reglas = {
        id: (val) => {
            valores.push(val);
            condiciones.push(`id = $${valores.length}`);
        },
        nombre: (val) => {
            valores.push(`%${val}%`);
            condiciones.push(`nombre ILIKE $${valores.length}`);
        },
        marca: (val) => {
            valores.push(val);
            condiciones.push(`marca = $${valores.length}`);
        },
        sku: (val) => {
            valores.push(val);
            condiciones.push(`sku = $${valores.length}`);
        }
    };

    Object.keys(filtros).forEach(key => {
        if (filtros[key] && reglas[key]) {
            reglas[key](filtros[key]);
        }
    });

    let sql = 'SELECT * FROM productos';
    if (condiciones.length > 0) {
        sql += ' WHERE ' + condiciones.join(' AND ');
    }

    const resultado = await pool.query(sql, valores);
    return resultado.rows;
}

async function crearProducto(producto) {
    try {
        const { nombre, descripcion, precio, stock, talla, marca, sku } = producto;
        

        /// sql(query)- arreglo(variables)
        await pool.query(
            `INSERT INTO productos 
                (nombre, descripcion, precio, stock, talla, marca, sku) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7)`,
            [nombre, descripcion, precio, stock, talla, marca, sku]
        );
        
        // Si no saltó al catch, es que se guardó. Retornamos true.
        return true; 
    } catch (error) {
        console.error("Error en crearProducto:", error);
        throw error;
    }
}

async function modificarProducto(producto) {
    try {
        const { id, nombre, descripcion, precio, stock, talla, marca, sku } = producto;
        
        const resultado = await pool.query(
            `UPDATE productos 
            SET 
                nombre=$1, descripcion=$2, precio=$3, stock=$4, 
                talla=$5, marca=$6, sku=$7 
            WHERE id=$8`,
            [nombre, descripcion, precio, stock, talla, marca, sku, id]
        );

        // rowCount > 0 significa que encontró el ID y lo modificó
        // Si rowCount es 0, el ID no existía.
        return resultado.rowCount > 0;
    } catch (error) {
        console.error("Error en modificarProducto:", error);
        throw error;
    }
}

async function eliminarProducto(id) {
    try {
        if (!id) throw new Error("ID requerido");

        const resultado = await pool.query(
            `DELETE FROM productos WHERE id = $1`,
            [id]
        );

        // Retorna true si borró algo, false si el ID no existía
        return resultado.rowCount > 0; 
    } catch (error) {
        console.error("Error en eliminarProducto:", error);
        throw error;
    }
}

async function traercategorias(){
    try {
        const resultado = await pool.query('SELECT id, nombre FROM categorias')
        return resultado.rows; 
    } catch (error) {
        console.error("No se puedo encontrar la categoría", error)
        throw error;
        
    }

}




export {
    traerproductos,
    filtrarproductos,
    crearProducto,
    modificarProducto,
    eliminarProducto,
    traercategorias
};