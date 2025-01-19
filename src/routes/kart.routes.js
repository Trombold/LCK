import express from "express";
import { validateToken } from "../middlewares/validateToken.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { kartSchema } from "../schemas/kart.schema.js";
import { addKart, allKarts, deleteKart, getKartsInscribedToValidate, oneKart, patchNameTransponderKart, updateKart } from "../controllers/karts.controller.js";
const router = express.Router();

// //get all karts
router.get("/:email", validateToken, allKarts);

//get one kart
router.get("/one/:id", validateToken, oneKart);

//create one kart
router.post("/",validateToken,  addKart);

// //update one kart
router.put("/:id", validateToken,  updateKart);

// //delete one kart
router.delete("/:id", validateToken, deleteKart);

//obtener karts inscritos
router.get("/inscritos/current/validate", validateToken, getKartsInscribedToValidate);

router.patch("/transponder/:id", validateToken, patchNameTransponderKart);

export default router;
