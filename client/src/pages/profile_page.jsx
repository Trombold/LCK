import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth_context";
import ImageUser from "../components/profile/image_user";
import { updateProfileRequest } from "../api/auth";
import { Link } from "react-router-dom";
import { set } from "mongoose";

export default function ProfilePage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, updateImageUser } = useAuth();

  const { id, name, lastname, licencia, image } = user;

  const handleEditing = () => {
    setIsUpdating(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const file = data.image[0];

      if (!file) {
        toast.error("Debe adjuntar una imagen");
        return;
      }

      // Validación de tamaño de archivo
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 50) {
        toast.error("El archivo no debe superar los 50 MB");
        return;
      }

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("lastname", data.lastname);
      formData.append("licencia", data.licencia);
      formData.append("image", file);

      setIsUpdating(false);

      const res = await updateProfileRequest(formData);
      updateImageUser(res.data.image);
      toast.success("Se actualizó correctamente");
    } catch (error) {
      console.error(error);
      const errors = error.response.data.errors || [];
      errors.forEach((error) => {
        toast.error(error);
      });
      toast.error("Hubo un error al actualizar los datos del perfil");
    }
  };

  useEffect(() => {
    setValue("name", name);
    setValue("lastname", lastname);
    setValue("licencia", licencia);
  }, []);

  const validateFileSize = (file) => {
    const fileSizeInMB = file[0].size / (1024 * 1024);
    return fileSizeInMB <= 50 || "El archivo no debe superar los 50 MB";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          Perfil
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm flex flex-col gap-4">
            <div className="flex justify-center mb-4">
              <ImageUser image={image} name={name} lastname={lastname} />
            </div>
            <span className="text-lg dark:text-white">
              Suba una nueva imagen de perfil (opcional)
            </span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="file"
              {...register("image", {
                required: "Este campo es obligatorio",
                validate: validateFileSize,
              })}
              onChange={handleEditing}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
            <span className="text-lg dark:text-white">Nombre</span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
              onChange={handleEditing}
            />
            {errors.name && (
              <p className="text-red-500">Esté campo es obligatorio</p>
            )}
            <span className="text-lg dark:text-white">Apellido</span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              {...register("lastname", {
                required: "Este campo es obligatorio",
              })}
              onChange={handleEditing}
            />
            <span className="text-lg dark:text-white">Licencia FEDAK</span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              {...register("licencia", {
                required: "Este campo es obligatorio",
              })}
              onChange={handleEditing}
            />
            {errors.lastname && (
              <p className="text-red-500">Esté campo es obligatorio</p>
            )}
            <Link to="/change-password" className="dark:text-blue-400 font-semibold underline cursor-pointer dark:hover:text-blue-300">Cambiar contraseña</Link>
          </div>
          <div className="flex gap-4">
            <button
              type="reset"
              className="bg-red-500 hover:bg-red-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Limpiar Campos
            </button>
            {isUpdating && (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Actualizar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
