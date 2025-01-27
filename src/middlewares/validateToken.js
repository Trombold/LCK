import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
export const validateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ errors: ['Unauthorized'] });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
    console.log("Token decodificado:", decoded);
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ errors: ['Invalid token'] });
  }
  next();
}