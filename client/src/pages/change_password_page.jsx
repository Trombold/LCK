import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth_context";
import { patchResquePasswordForgotRequest, patchResquePasswordRequest } from "../api/auth";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const { _id } = useParams();

  const navigate = useNavigate();

  // const { id } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const id = _id || user.id || "";
      const dataSend = {
        id,
        ...data,
      };
      // await !id ? patchResquePasswordRequest(dataSend): patchResquePasswordForgotRequest(dataSend);
      if(!id){
        await patchResquePasswordRequest(dataSend); 
      }else{
        await patchResquePasswordForgotRequest(dataSend);
      }
      toast.success("Se actualizó correctamente, serás redirigido al inicio de sesión");
      setTimeout(() => {
        navigate("/login"); // Reemplaza "/your-target-path" con la ruta a la que deseas redirigir
      }, 3000);
    } catch (error) {
      console.error(error);
      const errors = error.response.data.errors || [];
      console.log(errors);
      errors.forEach((error) => {
        toast.error(error);
      });
      toast.error("Hubo un error al actualizar la contraseña");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          Cambiar Contraseña
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm flex flex-col gap-4">
            {!_id && (
              <span className="text-lg dark:text-white">Contraseña Actual</span>
            )}
            {!_id && (
              <input
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="password"
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
              />
            )}
            {errors.password && (
              <p className="text-red-500">Esté campo es obligatorio</p>
            )}
            <span className="text-lg dark:text-white">Nueva Contraseña</span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              {...register("newPassword", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500">Esté campo es obligatorio</p>
            )}
            <span className="text-lg dark:text-white">Repetir Contraseña</span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              {...register("repeatPassword", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.repeatPassword && (
              <p className="text-red-500">Esté campo es obligatorio</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="reset"
              className="bg-red-500 hover:bg-red-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Limpiar Campos
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {_id ? "Actualizar" : "Registrar"} Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
