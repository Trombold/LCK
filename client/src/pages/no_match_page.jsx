export default function NoMatchPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-300"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}
