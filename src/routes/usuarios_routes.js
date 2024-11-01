import { Router } from "express";
import { getusuarios, getusuariosid,postusuarios,putusuarios,patchusuarios,deleteusuarios } from "../controladores/usuariosctrl.js";

const router = Router();

// Armar nuestras rutas
router.get("/usuarios", getusuarios);
router.get("/usuarios/:id", getusuariosid);
router.post("/usuarios", postusuarios);//insertasr
router.put("/usuarios/:id", putusuarios);//update
router.patch("/usuarios/:id", patchusuarios);//update partial
router.delete("/usuarios/:id", deleteusuarios);//delete

export default router;
