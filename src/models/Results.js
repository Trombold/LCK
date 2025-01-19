//Aqui se ubicaran las normas para tratar los datos
import mongoose from "mongoose";
const { Schema } = mongoose; // Se crea la variable donde se guardaran los datos del Schema

const resultsSchema = new Schema(
  {
    // Aqui definimos los parametros para el schema y si son obligatorios o no
    id_validate: { type: String, required: true },
    id_championship: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    results: [
      {
        placed: { type: Number, required: true },
        numberKart: { type: Number, required: true },
        name: { type: String, required: true },
        time: { type: String, required: true },
        points: { type: Number, required: true },
      },
    ],
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

const Results = mongoose.model("Results", resultsSchema);

export default Results; // Se exporta para poder usarlo en otras clases y se requieren dos parametros el Results y  el eschema
