import { config } from "dotenv";
config();
import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

export const updateProfile = async (req, res) => {
  const { id, name, lastname, licencia } = req.body;

  try {
    const image = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : "";
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        licencia,
        image,
      },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const postResquePassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ errors: ["El usuario no existe"] });
    const info = await transporter.sendMail({
      from: `Loja Karting Club <${process.env.EMAIL_NODEMAILER}>`,
      to: email,
      subject: "Cambio de contraseña",
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cambio de Contraseña</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333;">Solicitud de Cambio de Contraseña</h2>
              <p>Se solicitó el cambio de contraseña.</p>
              <p>Para cambiar su contraseñay y verificar su correo, haga clic en el siguiente botón:</p>
              <a href="${
                process.env.APP_URL || "http://localhost:5000"
              }/api/users/resque-password/${email}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #fff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
                Cambiar Contraseña
              </a>
              <p style="color: #666;">Si no solicitó este cambio, ignore este correo.</p>
            </div>
          </body>
        </html>
      `,
    });
    console.log(info);

    res.status(200).json({ info });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getResquePassword = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: ["El usuario no existe"] });
    }

    user.isChangePassword = true;
    await user.save();

    // Redirige al usuario a la página de cambio de contraseña
    const serverHostFront = process.env.SERVER_HOST_FRONT;
    const serverPortFront = process.env.SERVER_PORT_FRONT;
    const redirectUrl = `${serverHostFront}:${serverPortFront}/#/change-password/${user._id}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const patchResquePassword = async (req, res) => {
  const { id, newPassword, repeatPassword } = req.body;
  const userRequest = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ errors: ["El usuario no existe"] });
    }

    if (!userRequest || !userRequest.payload || !userRequest.payload.id) {
      if (!user.isChangePassword) {
        return res.status(400).json({
          errors: [
            "No se ha verficado el cambio de contraseña para este usuario",
          ],
        });
      }
    } else {
      if (userRequest.payload.id !== user._id.toString()) {
        return res.status(400).json({
          errors: [
            "Error de autenticación, no se puede cambiar la contraseña de este usuario",
          ],
        });
      }
    }

    if (newPassword !== repeatPassword) {
      return res.status(400).json({ errors: ["Las contraseñas no coinciden"] });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10); // encriptamos la contrasena

    user.password = passwordHash;
    user.isChangePassword = false;
    await user.save();

    res.status(200).json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      licencia: user.licencia,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};
