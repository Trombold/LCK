//Conexion con la base de datos y se une a index.js
import mongoose from "mongoose"; // Modulo para manejar la coneccion a mongo db

mongoose.set("strictQuery", false); // desde Mongoose 7 strictQuery sera puesta por defecto en false por loq ue se anade en caso de querer usarlo cambia
mongoose
  .connect(
    "mongodb+srv://xavier_123:xavier_123@lck.mevmnhk.mongodb.net/LojaKartingClub?retryWrites=true&w=majority&appName=lck"
    //"mongodb+srv://xavier_123:xavier_123@cluster0.p1swo.mongodb.net/xavier?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((db) => console.log("Base de datos Conectada"))
  .catch((err) => console.error(err));
