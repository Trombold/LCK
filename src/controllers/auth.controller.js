import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const register = async (req, res) => {
  const { name, lastname, email, password, repeatPassword } = req.body;

  try {
    if (password !== repeatPassword)
      return res.status(400).json({ errors: ["Las contraseñas no coinciden"] });
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ errors: ["El usuario ya existe"] });

    const passwordHash = await bcrypt.hash(password, 10); // encriptamos la contrasena

    const user = await User.create({
      name,
      lastname,
      email,
      password: passwordHash,
      image: "",
      licencia:"",
    });

    const token = await createAccessToken({ id: user._id });

    res.cookie("token", token);
    res.json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      image: user.image,
      role: user.role,
      licencia: user.licencia,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ errors: ["El usuario no existe"] });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ errors: ["Credenciales no válidas"] });

    const token = await createAccessToken({ id: user._id });

    res.cookie("token", token);
    res.json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      image: user.image,
      role: user.role,
      licencia: user.licencia,
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};
export const logout = (_req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const changePassword = async (req, res) => {
  const { id, password, newPassword, repeatPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({ errors: ["El usuario no existe"] });

    if (newPassword !== repeatPassword)
      return res.status(400).json({ errors: ["Las contraseñas no coinciden"] });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ errors: ["Credenciales no válidas"] });

    const passwordHash = await bcrypt.hash(newPassword, 10); // encriptamos la contrasena

    user.password = passwordHash;
    user.isChangePassword = false;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  try {
    if (!token) return res.status(401).json({ errors: ["No autorizado"] });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ errors: ["No autorizado"] });

      const userFound = await User.findById(user.id);
      if (!userFound)
        return res.status(401).json({ errors: ["No autorizado"] });
      res.json({
        id: userFound._id,
        name: userFound.name,
        lastname: userFound.lastname,
        email: userFound.email,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};
