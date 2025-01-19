import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-white border-gray-200 dark:bg-gray-900 dark:text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-center max-w-md md:text-left">
            <h2 className="text-xl font-bold">Karting Club Loja</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
              enim, cumque iure dignissimos ducimus quos sapiente aperiam ab
              laboriosam nihil.
            </p>
          </div>
          {/* {{! <div className="text-center md:text-left">
        <h2 className="text-xl font-bold">Enlaces Rápidos</h2>
        <ul className="mt-2 space-y-2">
          <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
          <li><a href="/users/register" className="text-gray-400 hover:text-white">Registro</a></li>
          <li><a href="/users/login" className="text-gray-400 hover:text-white">Inicia Sesión</a></li>
        </ul>
      </div> }} */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">Contáctanos</h2>
            <ul className="mt-2 space-y-2  text-gray-600 dark:text-gray-300">
              <li>
                Email:{" "}
                <Link
                  to="mailto:contacto@kartingclubloja.com"
                  className="dark:text-gray-300 hover:text-white"
                >
                  contacto@kartingclubloja.com
                </Link>
              </li>
              <li>
                Teléfono:{" "}
                <span className="dark:text-gray-300">+593 987654321</span>
              </li>
              <li>
                Dirección:{" "}
                <span className="dark:text-gray-300">
                  Calle Falsa 123, Loja, Ecuador
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2024 Karting Club Loja. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
