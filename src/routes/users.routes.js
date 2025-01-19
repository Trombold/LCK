import multer from "multer";
import express from 'express';                                 // Permite tener un Objeto para la facilitacion de Rutas
const router = express.Router();  


import { validateToken } from "../middlewares/validateToken.js";                                   // Con la variable router podemos crear rutas para el servidor
import { login, register, logout,verifyToken, changePassword } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { getResquePassword, patchResquePassword, postResquePassword, updateProfile } from '../controllers/profile.controller.js';

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB limit
});

router.post('/signin',validateSchema(loginSchema), login);

router.post('/signup',validateSchema(registerSchema), register);

router.get('/logout', logout);

router.get('/auth/verify',verifyToken);

router.patch("/change/password", validateToken, changePassword);

router.put("/profile", validateToken,upload.single("image"), updateProfile);

router.post("/resque-password",postResquePassword);

router.get("/resque-password/:email", getResquePassword);

router.patch("/resque-password", validateToken, patchResquePassword);

router.patch("/resque-password-forgot", patchResquePassword);


export default router