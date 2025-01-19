// Clase principal de la app
import { config } from "dotenv";
config();
import express from "express"; // modulo para manejar el html
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


import kartRoutes from "./routes/kart.routes.js";
import userRoutes from "./routes/users.routes.js";
import validatesRoutes from "./routes/validates.routes.js";
import inscriptionsRoutes from "./routes/inscriptions.routes.js";
import resultsRoutes from "./routes/results.routes.js";
import championshiptRoutes from "./routes/championship.routes.js";

// Crear __dirname equivalente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // modulo para manejar los paths o rutas

//inicializacion de variales
const app = express();
import "./database.js"; // Se Requiere e inicializa la conexion a la BD

// Setting donde nestaran todas las configuraciones

app.set("port", process.env.PORT || 5000); // se configura el puerto a usar si obtiene uno de la nube lo toma caso contrario s

// Middlewares iran todas las fuynciones que seran ejectuadas antes de llegar al servidor o pasar a las rutas
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// aapp.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//Static Files carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//Routes las rutas del proyecto
app.get("/", (_req, res) => {
  // Ruta de la pagina Principal Index
  // res.render('index');
  res.sendFile(path.resolve("src", "public", "index.html"));
});
// Aqui usamos las rutas ya sea de index kart o users
app.use("/api/karts", kartRoutes);
app.use("/api/users", userRoutes);
app.use("/api", validatesRoutes);
app.use("/api", inscriptionsRoutes);
app.use("/api", resultsRoutes);
app.use("/api", championshiptRoutes);

//Server Init aqui se iniciara el servidor
app.listen(app.get("port"), () => {
  console.log("Server on Port", app.get("port"));
});
