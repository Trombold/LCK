import express from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {
  addResults,
  deleteResult,
  getActiveResults,
  getAllResults,
  getAverageChampionshipResults,
  getResultsChampionshipClosed,
  getResultsChampionshipOpen,
  updateResult,
} from "../controllers/results.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
const router = express.Router();

//obtener todos los resultados
router.get("/results", validateToken, getAllResults);

//obtener un resultados activos
router.get("/results/all/active", validateToken,  getActiveResults);

//eliminar un resultado
router.delete("/results/:id", validateToken ,checkRole(["admin"]), deleteResult);

//crear un resultado
router.post("/results", validateToken,checkRole(["admin"]), addResults);

//actualizar un resultado
router.put("/results/:id", validateToken,checkRole(["admin"]), updateResult);

//obtener resultados del campeonato de apertura
router.get("/results/championship/open", validateToken, getResultsChampionshipOpen);

//obtener resultados del campeonato de cierre
router.get("/results/championship/close", validateToken, getResultsChampionshipClosed);

//obtener resultados del campeonato completo
router.get("/results/championship/final", validateToken, getAverageChampionshipResults);


export default router;
