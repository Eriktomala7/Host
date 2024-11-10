import express from "express";
import cors from "cors"; // Importa el paquete CORS
import clientes_routes from "./routes/clientes_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";
import producto_routes from "./routes/producto_routes.js";
import pedidos_routes from "./routes/pedidos_routes.js";
import ped_det_routes from "./routes/ped_det_routes.js";
import path from 'path';  // Importa el módulo 'path' para gestionar rutas de archivos

const app = express();

// Habilitar CORS para todas las rutas y orígenes
app.use(cors());  // Permite solicitudes desde cualquier origen

// O bien, si quieres permitir solo solicitudes de un origen específico:
app.use(cors({
  origin: 'http://localhost:8100'  // Reemplaza con la URL de tu frontend si es necesario
}));

app.use(express.json()); // interpreta los objetos enviados como JSON

// Ruta para servir imágenes desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de la API
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
