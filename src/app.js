import express from "express";
import clientes_routes from "./routes/clientes_routes.js";
import usuarios_routes from "./routes/usuarios_routes.js";
import producto_routes from "./routes/producto_routes.js";
import pedidos_routes from "./routes/pedidos_routes.js";
import ped_det_routes from "./routes/ped_det_routes.js";



const app = express();
app.use(express.json()); //interprete los objetos enviados como json
app.use("/api",clientes_routes)
app.use("/api",usuarios_routes)
app.use("/api",producto_routes)
app.use("/api",pedidos_routes)
app.use("/api",ped_det_routes)
app.use((req,res,next)=>{
    res.status(400).json({message:"Pagina no encontrada"});
})

export default app;