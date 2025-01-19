import express from "express";
import { validateToken } from "../middlewares/validateToken.js";
import multer from "multer";
import {
  addInscription,
  cancelInscription,
  confirmInscription,
  getAllInscriptions,
  getInscriptionsActives,
  getInscriptionsConfirmedActives,
  getOneInscription,
  getOneInscriptionOfUserInValidateActive,
} from "../controllers/inscriptions.controller.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB limit
});


//inscribirse
router.post("/inscriptions", validateToken, upload.single("url_image"), addInscription);

//confirmar inscripción
router.patch("/inscriptions/:id", validateToken,checkRole(["admin"]), confirmInscription);

//cancelar inscripción
router.delete("/inscriptions/:id", validateToken,checkRole(["admin"]), cancelInscription);

//obtener inscripciones activas (pendientes y confirmadas) de la presente válida
router.get("/inscriptions/current/validate", validateToken,checkRole(["admin"]), getInscriptionsActives);

//obtener inscripciones (confirmadas) activas
router.get("/inscriptions/confirmed/actives", validateToken,checkRole(["admin"]),getInscriptionsConfirmedActives);

//obtener todas las inscripciones creadas en todos los tiempos
router.get("/inscriptions", validateToken,checkRole(["admin"]),getAllInscriptions);

//obtener una inscripción
router.get("/inscriptions/:id", validateToken,getOneInscription);

//obtener una inscripción de un usuario en la valida activa
router.get("/inscriptions/validate/:id_user", validateToken,getOneInscriptionOfUserInValidateActive);



export default router;
