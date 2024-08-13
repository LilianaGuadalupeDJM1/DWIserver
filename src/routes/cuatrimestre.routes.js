import { Router } from "express";
import * as cuatrimestreCtrl from '../controllers/cuatrimestre.controller.js'; 

const router = Router();

// Rutas para cuatrimestres
router.get('/', cuatrimestreCtrl.getCuatrimestres);
router.get('/oferta/:ofertaId', cuatrimestreCtrl.getCuatrimestresByOferta);
router.get('/:cuatrimestreId', cuatrimestreCtrl.getCuatrimestreById);
router.post('/', cuatrimestreCtrl.createCuatrimestre);
router.put('/:cuatrimestreId', cuatrimestreCtrl.updateCuatrimestre);
router.delete('/:cuatrimestreId', cuatrimestreCtrl.deleteCuatrimestre);

export default router;
