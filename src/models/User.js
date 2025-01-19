import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    licencia: { type: String, default: "" },
    image: { type: String, default: "" },
    role: { type: String, default: "pilot" },
    isChangePassword: { type: Boolean, default: false },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);


userSchema.methods.ecryptPassword = async (password) => {
  // metodo para encriptar contrasenas mediante modulo bcrypt
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.matchPassword = async function (password) {
  // metodo para comparar las contrasenas encriptadas lo que hara es encriptar la contrasena al logear y --
  return await bcrypt.compare(password, this.password); // comparar con la ya encriptada en la base de datos para ver si son iguales
};

const User = mongoose.model("User", userSchema); // Se exporta para poder usarlo en otras clases y se requieren dos parametros el Usuario y el eschema

export default User;
