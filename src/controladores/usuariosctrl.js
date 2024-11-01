import { createHash } from 'crypto'; // Importa la librería de criptografía
import { conmysql } from "../db.js"; // Asegúrate de que la conexión a la base de datos esté configurada


const hashPassword = (password) => {
    return createHash('md5').update(password).digest('hex'); l
};

export const getusuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM usuarios");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

export const getusuariosid = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            "SELECT * FROM usuarios WHERE usr_id = ?", [req.params.id]
        );

        if (result.length <= 0) {
            return res.status(404).json({ cli_id: 0, message: "No se encontró el cliente" });
        }

       
        return res.json(result[0]);

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

export const postusuarios = async (req, res) => {
    try {
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

    
        const hashedPassword = hashPassword(usr_clave);

      
        const [rows] = await conmysql.query(
            "INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES (?, ?, ?, ?, ?, ?)",
            [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]
        );

        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: "Error al insertar usuarios" });
    }
};

export const putusuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        
        const hashedPassword = usr_clave ? hashPassword(usr_clave) : undefined;

        const [rows] = await conmysql.query(
            "UPDATE usuarios SET usr_usuario = ?, usr_clave = ?, usr_nombre = ?, usr_telefono = ?, usr_correo = ?, usr_activo = ? WHERE usr_id = ?",
            [usr_usuario, hashedPassword || usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id] // Usa la clave encriptada o la existente
        );

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ cli_id: 0, message: "Cliente no encontrado" });
        }

        const [filas] = await conmysql.query("SELECT * FROM usuarios WHERE usr_id = ?", [id]);
        res.json(filas[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


export const patchusuarios = async (req, res) => {

    // Implementa según sea necesario
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        
        const hashedPassword = usr_clave ? hashPassword(usr_clave) : undefined;

        const [rows] = await conmysql.query(
            "UPDATE usuarios SET usr_usuario = (?,usr_usuario), usr_clave = (?,usr_clave), usr_nombre = (?,usr_nombre), usr_telefono = (?,usr_telefono), usr_correo = (?,usr_correo), usr_activo = (?,usr_activo) WHERE usr_id = ?",
            [usr_usuario, hashedPassword || usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id] // Usa la clave encriptada o la existente
        );

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ cli_id: 0, message: "Cliente no encontrado" });
        }

        const [filas] = await conmysql.query("SELECT * FROM usuarios WHERE usr_id = ?", [id]);
        res.json(filas[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }

};

export const deleteusuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await conmysql.query("DELETE FROM usuarios WHERE usr_id = ?", [id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ cli_id: 0, message: "Cliente no encontrado" });
        }
        res.json({ message: "Cliente eliminado" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
    
 
};
