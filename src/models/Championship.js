//Aqui se ubicaran las normas para tratar los datos
import mongoose from "mongoose";
const { Schema } = mongoose; // Se crea la variable donde se guardaran los datos del Schema

const championshipSchema = new Schema(
  {
    // Aqui definimos los parametros para el schema y si son obligatorios o no
    title: { type: String, required: true },
    description: { type: String },
    open: { type: Boolean, required: true },
    dateInit: { type: String, required: true },
    dateEnd: { type: String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

const Championship = mongoose.model("Championship", championshipSchema);

export default Championship; // Se exporta para poder usarlo en otras clases y se requieren dos parametros el Championship y  el eschema
