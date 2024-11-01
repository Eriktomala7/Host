import e from "express";
import { conmysql } from "../db.js";

 export const getpedidosdet = async (req, res) => {
  try { 
    const sql = "SELECT * FROM `pedidos_detalle`";
    const pedidos = await conmysql.query(sql);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const getpedidosdetid = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM pedidos_detalle WHERE det_id = ${id}`;
    const pedidos = await conmysql.query(sql);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const postpedidosdet = async (req, res) => {
    try {
        const {prod_id,ped_id,det_cantidad,det_precio} = req.body;
        const sql = "INSERT INTO pedidos_detalle (prod_id,ped_id,det_cantidad,det_precio) VALUES (?,?,?,?)";
        const pedidos = await conmysql.query(sql, [prod_id,ped_id,det_cantidad,det_precio]);
       
        res.json(pedidos);
    

       
    } catch (error) {
        res.status(500).json({ error: "Error en la consulta" });
    }   
}

export const  putpedidosdet = async (req, res) => {
    try {
        const {prod_id,ped_id,det_cantidad,det_precio} = req.body;
        const sql = "UPDATE pedidos_detalle SET prod_id = ?, ped_id = ?, det_cantidad = ?, det_precio = ? WHERE det_id = ?";
        const pedidos = await conmysql.query(sql, [prod_id,ped_id,det_cantidad,det_precio,ped_id]);
        res.json(pedidos);
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el detallepedido", error });

        
    }
    
  
}
export const  patchpedidosdet = async (req, res) => {
    try {
        const {prod_id,ped_id,det_cantidad,det_precio} = req.body;
        const sql = "UPDATE pedidos_detalle SET prod_id =IFNULL (?,prod_id), ped_id =IFNULL (?,ped_id), det_cantidad =IFNULL (?,det_cantidad), det_precio =IFNULL (?,det_precio) WHERE det_id = ?";
        const pedidos = await conmysql.query(sql, [prod_id,ped_id,det_cantidad,det_precio,ped_id]);
        res.json(pedidos);
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el detallepedido", error });

        
    }
    
}

export const  deletepedidosdet = async (req, res) => {
    try {
        const {ped_id} = req.params;
        const sql = "DELETE FROM pedidos_detalle WHERE det_id = ?";
        const pedidos = await conmysql.query(sql, [ped_id]);
        res.json(pedidos);
    

       
    }
    catch (error) { 
        res.status(500).json({ error: "Error en la consulta" });        
    }
}