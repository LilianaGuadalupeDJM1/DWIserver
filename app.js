import cors from 'cors';
import express from 'express';
const app = express();

// Configuración de CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true
}));

// Manejo de solicitudes preflight (OPTIONS)
app.options('*', cors({
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

/* 
 ######                             
 #     # #    # #####   ##    ####  
 #     # #    #   #    #  #  #      
 ######  #    #   #   #    #  ####  
 #   #   #    #   #   ######      # 
 #    #  #    #   #   #    # #    # 
 #     #  ####    #   #    #  ####  
                                    
*/

// Importar y usar rutas
import admisionRoutes from './src/routes/admision.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import ofertaRoutes from './src/routes/oferta.routes.js';
import profesorRoutes from './src/routes/profesor.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import divicionesRoutes from './src/routes/diviciones.routes.js';
import materiaRoutes from './src/routes/materia.routes.js';
import cuatrimestreRoutes from './src/routes/cuatrimestre.routes.js';
import rolesRoutes from        './src/routes/rol.routes.js';
import cursoRoutes from        './src/routes/curso.routes.js';
app.use('/api/admision', admisionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/oferta', ofertaRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/diviciones', divicionesRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/cuatrimestre', cuatrimestreRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/cursos', cursoRoutes);
export default app;
