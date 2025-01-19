// middlewares/checkRole.js
import User from "../models/User.js";

export const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // Asumimos que el usuario ya está agregado al req en validateToken
      
      if (!user) {
        return res.status(401).json({ errors: ["No autorizado"] });
      }

      const userFound = await User.findById(user.payload.id);

      if (!userFound) {
        return res.status(401).json({ errors: ["No autorizado"] });
      }

      if (!roles.includes(userFound.role)) {
        return res.status(403).json({ errors: ["No tienes permiso para acceder a esta ruta"] });
      }

      next();
    } catch (error) {
      console.error("Error en middleware checkRole:", error);
      return res.status(500).json({ errors: ["Error interno del servidor"] });
    }
  };
};
