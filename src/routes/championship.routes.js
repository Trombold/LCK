import express from 'express';                                 
const router = express.Router();
import { validateToken } from "../middlewares/validateToken.js";
import { addChampionship, closeOneChampionship, deleteOneChampionship, editChampionship, getAllChampionships, getOneChampionship, openOneChampionship } from '../controllers/championship.controller.js';
import { checkRole } from '../middlewares/checkRole.js';

//crear campeonato
router.post("/championship", validateToken,checkRole(["admin"]), addChampionship);

//editar campeonato
router.put("/championship/:id", validateToken, checkRole(["admin"]),editChampionship);

//obtener un campeonato
router.get("/championship/:id", validateToken, checkRole(["admin"]),getOneChampionship );

//obtener todos los campeonatos
router.get("/championships", validateToken, checkRole(["admin"]), getAllChampionships);

//cerrar una valida
router.patch("/championship/close/:id", validateToken, checkRole(["admin"]),closeOneChampionship );

//habilitar una valida
router.patch("/championship/open/:id", validateToken, checkRole(["admin"]), openOneChampionship);

//eliminar un campeonato
router.delete("/championship/:id", validateToken, checkRole(["admin"]), deleteOneChampionship);



export default router;