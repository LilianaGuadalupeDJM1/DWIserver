import { Router } from "express";

const router = Router();


import * as divisionCtrl from '../controllers/divicion.controller.js';

import { authJwt } from "../middlewares/index.js";

// Establecer rutas para Division
router.get('/', divisionCtrl.getDivisions);
router.get('/:divisionId', divisionCtrl.getDivision);
router.post('/', [authJwt.verifyToken] ,divisionCtrl.createDivision);
router.put('/:divisionId',[authJwt.verifyToken] , divisionCtrl.updateDivision);
router.delete('/:divisionId', [authJwt.verifyToken] , divisionCtrl.deleteDivision);

export default router;


