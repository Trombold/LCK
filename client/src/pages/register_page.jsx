import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/auth_context";
import { useEffect } from "react";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const {
    signup,
    isAuthenticated,
    errors: RegisterErrors,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    RegisterErrors.forEach((error) => {
      toast.error(error);
    });
  }, [RegisterErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    signup(data);
  });
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900 py-8">   
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center">
          <img
            src="/img/kartingsign.jpg"
            alt="Logo"
            className="h-32 w-32 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          Regístrate
        </h2>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nombre"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500">This field is required</p>
            )}
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Apellido"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <p className="text-red-500">This field is required</p>
            )}
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">This field is required</p>
            )}
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">This field is required</p>
            )}
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Repetir contraseña"
              type="password"
              {...register("repeatPassword", { required: true })}
            />
            {errors.confirm_password && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
          <div className="text-sm text-center text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/users/signin"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
