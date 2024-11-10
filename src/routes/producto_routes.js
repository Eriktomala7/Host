import { Router } from "express";
import multer from "multer";
import { getproductos, getproductosid, postproductos, putproductos, patchproductos, deleteproductos } from "../controladores/productoctrl.js";

const router = Router();

// Configuración de multer para guardar archivos en el directorio 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Rutas
router.get("/productos", getproductos);
router.get("/productos/:id", getproductosid);
router.post("/productos", upload.single("prod_imagen"), postproductos); // Modificado para aceptar imagen
router.put("/productos/:id", putproductos);
router.patch("/productos/:id", patchproductos);
router.delete("/productos/:id", deleteproductos);

export default router;
