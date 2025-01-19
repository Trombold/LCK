import express from 'express';                                 
const router = express.Router();
import { validateToken } from "../middlewares/validateToken.js";
import { addValida, closeOneValida, deleteOneValida, editValida, getAllValidas, getOneValida, getValidaActive, openOneValida } from '../controllers/validates.controller.js';
import { checkRole } from '../middlewares/checkRole.js';

//obtener una valida activa
router.get("/validate-active", validateToken, getValidaActive);

//crear válida
router.post("/validate", validateToken,checkRole(["admin"]), addValida);

//editar válida
router.put("/validate/:id", validateToken,checkRole(["admin"]),editValida);

//obtener todas las validas
router.get("/validates", validateToken,checkRole(["admin"]), getAllValidas);

//obtener una valida
router.get("/validate/:id", validateToken,checkRole(["admin"]), getOneValida);

//cerrar una valida
router.patch("/validate/close/:id", validateToken,checkRole(["admin"]), closeOneValida);
//habilitar una valida
router.patch("/validate/open/:id", validateToken,checkRole(["admin"]), openOneValida);

router.delete("/validate/:id", validateToken,checkRole(["admin"]), deleteOneValida);



export default router;