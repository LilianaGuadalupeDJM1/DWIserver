import { Router } from "express";
import * as cursoCtrl from '../controllers/curso.controller.js'; 

const router = Router();

// Rutas para cursos
router.get('/', cursoCtrl.getCursos); // Obtener todos los cursos
router.get('/:cursoId', cursoCtrl.getCursoById); // Obtener un curso por ID
router.post('/', cursoCtrl.createCurso); // Crear un nuevo curso
router.put('/:cursoId', cursoCtrl.updateCursoById); // Actualizar un curso por ID
router.delete('/:cursoId', cursoCtrl.deleteCursoById); // Eliminar un curso por ID

export default router;
