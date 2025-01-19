//Aqui se ubicaran las normas para tratar los datos
import mongoose from "mongoose";
const { Schema } = mongoose; // Se crea la variable donde se guardaran los datos del Schema

const inscriptionsSchema = new Schema(
  {
    // Aqui definimos los parametros para el schema y si son obligatorios o no
    id_validate: { type: String, required: true },
    id_user: { type: String, required: true },
    id_karts: [{ type: String, required: true }],
    state: { type: String, required: true },
    url_image: { type: String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

const Inscriptions = mongoose.model("Inscriptions", inscriptionsSchema);

export default Inscriptions; // Se exporta para poder usarlo en otras clases y se requieren dos parametros el Inscriptions y  el eschema
