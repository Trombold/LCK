import backgroundImage from "../assets/images/fondo-lp.jpg";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <main className="relative w-full h-screen">
      <div className="relative h-full">
        <img
          src={backgroundImage}
          alt="fondo karting"
          className="absolute left-0 w-full h-full object-cover"
        />
        <div className="absolute h-1/2 inset-x-0 bottom-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
        <div className="absolute top-1/2 md:right-10 transform -translate-y-1/2 bg-white dark:bg-gray-900 dark:bg-opacity-90 dark:text-white bg-opacity-90 p-6 md:max-w-sm rounded-lg shadow-lg mx-4 md:mx-0">
          <span className="text-2xl font-bold block mb-4">
          Loja Karting Club
          </span>
          <p className="mb-4">
          Bienvenido a Loja Karting Club, el corazón del karting en el sur del Ecuador.
          Somos la organización oficial detrás del emocionante Campeonato Austral de Karting,
          un evento que reúne a pilotos de todo el sur del pais en la ciudad de Loja.
          Con un compromiso con la seguridad, la competencia justa y el amor por la velocidad,
          Únete a nosotros y sé parte de la pasión, la adrenalina y la emoción que hacen del
          karting el deporte perfecto para los amantes de la velocidad. ¡La pista te espera!.
          </p>
          <div className="flex gap-2">
            <Link
              to="/signin"
              className="text-blue-500 underline md:no-underline hover:underline"
            >
              Inicia sesión
            </Link>
            o
            <Link
              to="/signup"
              className="text-blue-500 underline md:no-underline hover:underline"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
