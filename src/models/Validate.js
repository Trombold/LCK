//Aqui se ubicaran las normas para tratar los datos
import mongoose from "mongoose";
const { Schema } = mongoose; // Se crea la variable donde se guardaran los datos del Schema

const validateSchema = new Schema(
  {
    // Aqui definimos los parametros para el schema y si son obligatorios o no
    id_championship: { type: String, required: true },
    title: { type: String, required: true },
    indications: { type: String, required: true },
    isOfApert: { type: String, required: true },
    open: { type: Boolean, required: true },
    dateInit: { type: String, required: true },
    dateEnd: { type: String, required: true },
    timeInit: { type: String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

const Validate = mongoose.model("Validate", validateSchema);

export default Validate; // Se exporta para poder usarlo en otras clases y se requieren dos parametros el Validate y  el eschema
