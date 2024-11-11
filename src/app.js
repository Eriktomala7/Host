import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url'; // Esto se usa para obtener __dirname en ES Modules
import clientes_routes from "./routes/clientes_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";
import producto_routes from "./routes/producto_routes.js";
import pedidos_routes from "./routes/pedidos_routes.js";
import ped_det_routes from "./routes/ped_det_routes.js";

const app = express();

// Habilitar CORS
app.use(cors({ origin: 'http://localhost:8100' }));

// Configura el middleware para servir archivos estáticos (como imágenes)
// Configura el middleware para servir archivos estáticos (como imágenes)
const __dirname = path.resolve(); // Cambia path.dirname a path.resolve para obtener la ruta correcta
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware para interpretar los objetos enviados como JSON
app.use(express.json());

// Rutas
app.use("/api", clientes_routes);
app.use("/api", usuarios_routes);
app.use("/api", producto_routes);
app.use("/api", pedidos_routes);
app.use("/api", ped_det_routes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: "Página no encontrada" });
});

export default app;
