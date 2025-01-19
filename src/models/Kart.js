//Aqui se ubicaran las normas para tratar los datos
import mongoose from "mongoose";
const { Schema } = mongoose; // Se crea la variable donde se guardaran los datos del Schema

const kartSchema = new Schema(
  {
    // Aqui definimos los parametros para el schema y si son obligatorios o no
    category: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    haveTransponder: { type: Boolean, required: true },
    emailUser: { type: String, required: true },
    nameTransponder: { type: String },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

const Kart = mongoose.model("Kart", kartSchema);

export default Kart; // Se exporta para poder usarlo en otras clases y se requieren dos parametros el kart y  el eschema
