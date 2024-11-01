import { Router } from "express";
import { getpedidos, getpedidosid,postpedidos,putpedidos,patchpedidos,deletepedidos } from "../controladores/pedidosctrl.js";


const router = Router();

// Armar nuestras rutas
router.get("/pedidos", getpedidos);

router.get("/pedidos/:id", getpedidosid);

router.post("/pedidos", postpedidos);//insertasr

router.put("/pedidos/:id", putpedidos);//update

router.patch("/pedidos/:id", patchpedidos);//update partial
router.delete("/pedidos/:id", deletepedidos);//delete

export default router;
