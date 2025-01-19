import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  toast } from "react-toastify";
import PropTypes from "prop-types";
import { getKartsRequest } from "../../api/karts";
import { useAuth } from "../../contexts/auth_context";
import { addInscriptionRequest } from "../../api/inscriptions";

export default function InscriptionForm({ nextStep, id_validate }) {
  const [karts, setKarts] = useState([]);
  const { user } = useAuth();

  const getKarts = async () => {
    const res = await getKartsRequest(user.email);
    setKarts(res.data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const file = data.url_image[0];

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
      formData.append("id_validate", id_validate);
      formData.append("id_user", user.id); 
      formData.append("id_karts", JSON.stringify(data.karts));
      formData.append("url_image", file);

      await addInscriptionRequest(formData);
      nextStep();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al registrar la inscripción");
    }
  };

  useEffect(() => {
    getKarts();
  }, []);

  const validateFileSize = (file) => {
    const fileSizeInMB = file[0].size / (1024 * 1024);
    return fileSizeInMB <= 50 || "El archivo no debe superar los 50 MB";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          Registrar Inscripción
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <span className="text-lg dark:text-white">
            Eliga los carts a inscribir
          </span>
          <div className="rounded-md shadow-sm">
            {karts.map((kart, index) => (
              <label
                key={index}
                className="mb-4 flex gap-4 dark:text-white border rounded-md p-2 "
              >
                <span>Kart nro: {kart.number}</span>
                <span>Categoría: {kart.category}</span>
                <input
                  type="checkbox"
                  value={kart._id}
                  {...register("karts", { required: true })}
                />
              </label>
            ))}
            {errors.karts && (
              <p className="text-red-500"> Debe seleccionar almenos un kart </p>
            )}
            <span className="text-lg dark:text-white">
              Suba el comprobante de pago (máximo 50 MB)
            </span>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="file"
              {...register("url_image", {
                required: "Este campo es obligatorio",
                validate: validateFileSize,
              })}
            />
            {errors.url_image && (
              <p className="text-red-500">{errors.url_image.message}</p>
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
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

InscriptionForm.propTypes = {
  nextStep: PropTypes.func.isRequired,
  id_validate: PropTypes.string.isRequired,
};
