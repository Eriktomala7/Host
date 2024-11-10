import express from "express";
import clientes_routes from "./routes/clientes_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";
import producto_routes from "./routes/producto_routes.js"; // Asegúrate de que esta importación sea correcta
import pedidos_routes from "./routes/pedidos_routes.js";
import ped_det_routes from "./routes/ped_det_routes.js";

const app = express();
app.use(express.json()); // interpreta los objetos enviados como JSON

// Rutas
app.use("/api", clientes_routes);
app.use("/api", usuarios_routes);
app.use("/api", producto_routes); // Asegúrate de que esta ruta esté registrada correctamente
app.use("/api", pedidos_routes);
app.use("/api", ped_det_routes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: "Página no encontrada" });
});

export default app;
