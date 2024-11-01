import { Router } from "express";
import { getproductos, getproductosid,postproductos,putproductos,patchproductos,deleteproductos } from "../controladores/productoctrl.js";


const router = Router();

// Armar nuestras rutas
router.get("/productos", getproductos);
router.get("/productos/:id", getproductosid);
router.post("/productos", postproductos);//insertasr
router.put("/productos/:id", putproductos);//update
router.patch("/productos/:id", patchproductos);//update partial
router.delete("/productos/:id", deleteproductos);//delete

export default router;
