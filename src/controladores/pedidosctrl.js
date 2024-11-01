import e from "express";
import { conmysql } from "../db.js";

export const getpedidos = async (req, res) => {
  try { 
    const sql = "SELECT * FROM pedidos";
    const pedidos = await conmysql.query(sql);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const getpedidosid = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM pedidos WHERE ped_id = ${id}`;
    const pedidos = await conmysql.query(sql);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const postpedidos = async (req, res) => {
    try {
        const {cli_id, ped_fecha, usr_id, ped_estado} = req.body;
        const sql = "INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES (?,?,?,?)";
        const pedidos = await conmysql.query(sql, [cli_id, ped_fecha, usr_id, ped_estado]);
        res.json(pedidos);
    

       
    } catch (error) {
        res.status(500).json({ error: "Error en la consulta" });
    }
};

export const putpedidos = async (req, res) => {
  try {
    const { id } = req.params;
    const {cli_id, ped_fecha, usr_id, ped_estado} = req.body;
    const sql = "UPDATE pedidos SET cli_id=?, ped_fecha=?, usr_id=?, ped_estado=? WHERE ped_id=?";
    const pedidos = await conmysql.query(sql, [cli_id, ped_fecha, usr_id, ped_estado, id]);
    res.json(pedidos);
} catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
}
};

export const patchpedidos = async (req, res) => {
  try {
    const { id } = req.params;
    const {cli_id, ped_fecha, usr_id, ped_estado} = req.body;
    const sql = "UPDATE pedidos SET cli_id=IFNULL(?,cli_id), ped_fecha=IFNULL(?,ped_fecha), usr_id=IFNULL(?,usr_id), ped_estado=IFNULL(?,ped_estado) WHERE ped_id=?";
    const pedidos = await conmysql.query(sql, [cli_id, ped_fecha, usr_id, ped_estado, id]);
    res.json(pedidos);  
  } catch (error) { 
    
  }
   
};

export const deletepedidos = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM pedidos WHERE ped_id=?";
        const pedidos = await conmysql.query(sql, [id]);
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error en la consulta" });
    }
};

