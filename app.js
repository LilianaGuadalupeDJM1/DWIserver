import cors from 'cors';
import express from 'express';
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true
}));

app.use(express.json());

// Crear roles por defecto
import { createRoles } from './src/libs/initialSetup.js';
createRoles();

// Ruta inicial
import * as messages from "./Art/Messages.js";
app.get('/', (req, res) => {
    res.send(messages.Welcome)
});


app.use(cors(
  {
    origin: "*",
    methods: ['GET', 'PUT', 'POST', 'DELETE'], // Agrega 'PUT' a los métodos permitidos
    credentials: true
  }
))


/* 
 ######                             
 #     # #    # #####   ##    ####  
 #     # #    #   #    #  #  #      
 ######  #    #   #   #    #  ####  
 #   #   #    #   #   ######      # 
 #    #  #    #   #   #    # #    # 
 #     #  ####    #   #    #  ####  
                                    
*/
import admisionRoutes from './src/routes/admision.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import ofertaRoutes from './src/routes/oferta.routes.js';
import profesorRoutes from './src/routes/profesor.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
app.use('/api/admision', admisionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/oferta', ofertaRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/usuarios', usuarioRoutes)

export default app;
