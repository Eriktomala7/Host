import e from "express";
import { conmysql } from "../db.js";

export const getClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM clientes");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener clientes" });
    }
};

export const getClientesid = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            "SELECT * FROM clientes WHERE cli_id = ?", [req.params.id]
        );

        if (result.length <= 0) {
            return res.status(404).json({ cli_id: 0, message: "No se encontró el cliente" });
        }
        return res.json(result[0]);

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

export const postClientes = async (req, res) => {
    try {
        const clientes = req.body;
        const idsInsertados = []; 
        for (let cliente of clientes) {
            const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = cliente;

            if (!cli_identificacion || !cli_nombre || !cli_telefono || !cli_correo || !cli_direccion || !cli_pais || !cli_ciudad) {
                return res.status(400).json({ message: "Faltan datos requeridos en uno o más registros." });
            }
            const [result] = await conmysql.query(
                "INSERT INTO clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad]
            );

            idsInsertados.push(result.insertId);
        }

        // Enviar los IDs de los clientes insertados
        res.send({ ids: idsInsertados });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al insertar clientes" });
    }
};


export const putClientes = async (req, res) => {
    try {
        const { id } = req.params;  
        const {
            cli_identificacion,
            cli_nombre,
            cli_telefono,
            cli_correo,
            cli_direccion,
            cli_pais,
            cli_ciudad
        } = req.body;

        // Validar que los campos requeridos no sean nulos o indefinidos
        if (!cli_identificacion || !cli_nombre || !cli_telefono || !cli_correo || !cli_direccion || !cli_pais || !cli_ciudad) {
            return res.status(400).json({ message: "Faltan datos requeridos para la actualización." });
        }

        // Ejecutar la consulta de actualización
        const [rows] = await conmysql.query(
            "UPDATE clientes SET cli_identificacion = ?, cli_nombre = ?, cli_telefono = ?, cli_correo = ?, cli_direccion = ?, cli_pais = ?, cli_ciudad = ? WHERE cli_id = ?", 
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
        );

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ cli_id: 0, message: "Cliente no encontrado" });
        }
        const [filas] = await conmysql.query("SELECT * FROM clientes WHERE cli_id = ?", [id]);
        res.json(filas[0]);

    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

export const patchClientes = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del cliente desde los parámetros de la URL

        // Desestructurar los datos del cuerpo de la solicitud
        const {
            cli_identificacion,
            cli_nombre,
            cli_telefono,
            cli_correo,
            cli_direccion,
            cli_pais,
            cli_ciudad
        } = req.body;


        const [rows] = await conmysql.query(
            "UPDATE clientes SET cli_identificacion =IFNULL(?,cli_identificacion) , cli_nombre =IFNULL (?,cli_nombre), cli_telefono =IFNULL(?,cli_telefono) , cli_correo =IFNULL(?,cli_correo), cli_direccion =IFNULL (?,cli_direccion), cli_pais = IFNULL (?,cli_pais), cli_ciudad =IFNULL (?,cli_ciudad) WHERE cli_id = ?", 
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
        );

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ cli_id: 0, message: "Cliente no encontrado" });
        }
        const [filas] = await conmysql.query("SELECT * FROM clientes WHERE cli_id = ?", [id]);
        res.json(filas[0]);

    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "Error en el servidor" });
    }

}
export const deleteClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM clientes WHERE cli_id = ?", [req.params.id]);
        if (result.affectedRows <= 0) 
            return res.status(404).json({ id:0,message: "No se pudo eliminar al cliente" });
        res.sendStatus(202);
      
    } catch (error) {
    
        return res.status(500).json({ message: "Error en el servidor", error });
    }
}
