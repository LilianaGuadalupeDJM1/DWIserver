import { Router } from "express";
import * as roleCtrl from '../controllers/rol.controller.js'; 

const router = Router();

// Rutas para roles
router.get('/', roleCtrl.getRoles); // Obtener todos los roles
router.get('/:roleId', roleCtrl.getRoleById); // Obtener un rol por ID
router.post('/', roleCtrl.createRole); // Crear un nuevo rol
router.put('/:roleId', roleCtrl.updateRoleById); // Actualizar un rol por ID
router.delete('/:roleId', roleCtrl.deleteRoleById); // Eliminar un rol por ID

export default router;
