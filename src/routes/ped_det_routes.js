import { Router } from "express";
import { getpedidosdet, getpedidosdetid,postpedidosdet,putpedidosdet,patchpedidosdet,deletepedidosdet } from "../controladores/ped_detctrl.js";


const router = Router();

// Armar nuestras rutas
router.get("/pedidosdetalle", getpedidosdet);

router.get("/pedidosdetalle/:id", getpedidosdetid);

router.post("/pedidosdetalle", postpedidosdet);//insertasr

router.put("/pedidosdetalle/:id", putpedidosdet);//update

router.patch("/pedidosdetalle/:id", patchpedidosdet);//update partial
router.delete("/pedidosdetalle/:id", deletepedidosdet);//delete

export default router;
