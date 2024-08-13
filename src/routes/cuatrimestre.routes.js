import { Router } from "express";
import * as cuatrimestreCtrl from '../controllers/cuatrimestre.controller.js'; 

const router = Router();

import { authJwt } from "../middlewares/index.js";
// Rutas para cuatrimestres
router.get('/', cuatrimestreCtrl.getCuatrimestres);
router.get('/oferta/:ofertaId', cuatrimestreCtrl.getCuatrimestresByOferta);
router.get('/:cuatrimestreId', cuatrimestreCtrl.getCuatrimestreById);
router.post('/',[authJwt.verifyToken, authJwt.isAdmin], cuatrimestreCtrl.createCuatrimestre);
router.put('/:cuatrimestreId', [authJwt.verifyToken, authJwt.isAdmin], cuatrimestreCtrl.updateCuatrimestre);
router.delete('/:cuatrimestreId', [authJwt.verifyToken, authJwt.isAdmin], cuatrimestreCtrl.deleteCuatrimestre);

export default router;
