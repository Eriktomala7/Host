import e from "express";
import { conmysql } from "../db.js";

export const getproductos = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM productos");
        res.json(result);
    } catch (error) {               
        return res.status(500).json({ message: "Error al obtener productos" });
    }
};

export const getproductosid = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            "SELECT * FROM productos WHERE prod_id = ?", [req.params.id]
        );

        if (result.length <= 0) {
            return res.status(404).json({ prod_id: 0, message: "No se encontró el producto" });
        }
        return res.json(result[0]);

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
export const postproductos = async (req, res) => {
    try {
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null;
        
        console.log("Datos del producto:", req.body);
        console.log("Archivo de imagen:", req.file);

        const [fila] = await conmysql.query('SELECT * FROM productos WHERE prod_codigo = ?', [prod_codigo]);
        if (fila.length > 0) {
            return res.status(400).json({
                id: 0,
                message: `Producto con código ${prod_codigo} ya está registrado`
            });
        }

        const [rows] = await conmysql.query(
            'INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
        );

        res.status(201).json({
            id: rows.insertId,
            message: "Producto registrado con éxito :)"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};





export const putproductos = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del producto desde los parámetros de la URL
        const {
            prod_codigo,
            prod_nombre,
            prod_stock,
            prod_precio,
            prod_activo,
            prod_imagen
        } = req.body;
        
        // Validar que los campos requeridos no sean nulos o indefinidos
        if (!prod_codigo || !prod_nombre || !prod_stock || !prod_precio || !prod_activo || !prod_imagen) {
            return res.status(400).json({ message: "Faltan datos requeridos para la actualización." });
        }
        
        // Ejecutar la consulta de actualización
        const [result] = await conmysql.query(            
            "UPDATE productos SET prod_codigo = IFNULL(?, prod_codigo), prod_nombre = IFNULL(?, prod_nombre), prod_stock = IFNULL(?, prod_stock), prod_precio = IFNULL(?, prod_precio), prod_activo = IFNULL(?, prod_activo), prod_imagen = IFNULL(?, prod_imagen) WHERE prod_id = ?", 
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        );
        
        if (result.affectedRows <= 0) {               
            return res.status(404).json({ prod_id: 0, message: "Producto no encontrado" });
        }
        
        // Respuesta de éxito si el producto fue actualizado correctamente
        res.json({ message: "Producto actualizado correctamente", prod_id: id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el producto", error });
    }
};


export const patchproductos = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del producto desde los parámetros de la URL

        // Desestructurar los datos del cuerpo de la solicitud
        const {
            prod_codigo,
            prod_nombre,
            prod_stock,
            prod_precio,
            prod_activo,
            prod_imagen
        } = req.body;

        // Ejecutar la consulta de actualización usando IFNULL para solo actualizar los campos no nulos
        const [rows] = await conmysql.query(
            `UPDATE productos 
            SET prod_codigo = IFNULL(?, prod_codigo), 
                prod_nombre = IFNULL(?, prod_nombre), 
                prod_stock = IFNULL(?, prod_stock), 
                prod_precio = IFNULL(?, prod_precio), 
                prod_activo = IFNULL(?, prod_activo), 
                prod_imagen = IFNULL(?, prod_imagen) 
            WHERE prod_id = ?`, 
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        );

        // Verificar si se afectaron filas en la actualización
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado o no actualizado" });
        }

        // Responder con éxito
        res.json({ message: "Producto actualizado correctamente" });

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(500).json({ 
            message: "Error al actualizar producto", 
            error: error.message || 'Error no especificado' 
        });
    }
};

export const deleteproductos = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM productos WHERE prod_id = ?", [req.params.id]);
        if (result.affectedRows <= 0) 
            return res.status(404).json({ id:0,message: "No se pudo eliminar al producto" });
        res.sendStatus(202);
      
    } catch (error) {
    
        return res.status(500).json({ message: "Error en el servidor", error });
    }
}
