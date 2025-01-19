import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { postResquePasswordRequest } from "../api/auth";
import { useRef } from "react";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formRef = useRef(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      toast.success(
        "Se envió un correo para restablecer la contraseña, verifique su correo. Si no lo recibe, revise la carpeta de Spam."
      );
      await postResquePasswordRequest(data);
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      const errors = error.response.data.errors || [];

      errors.forEach((error) => {
        toast.error(error);
      });

      toast.error("Hubo un error al recuperar la contraseña");
    }
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center">
          <img
            src="/img/kartingsign.jpg"
            alt="Logo"
            className="h-32 w-32 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          Recuperar Contraseña
        </h2>
        <form ref={formRef} className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <div className="text-sm text-center text-gray-600 dark:text-gray-300">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Registrate
            </Link>
          </div>
          <div className="text-sm text-center text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Inicia sesion
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Recuperar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
