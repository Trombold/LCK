import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import {
  addChampionshipRequest,
  closeChampionshipRequest,
  editChampionshipRequest,
  getOneChampionshipRequest,
  openChampionshipRequest,
} from "../api/championship";

export default function ManageChampionshipFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const isUpdating = params.id ? true : false;
  const [isEnabled, setIsEnabled] = useState(false);

  const formRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addValidate = async (data) => {
    try {
      await addChampionshipRequest(data);
      toast.success(
        "Campeonato agregado con exito, para habilitarlo debe ir a editar en el panel de gestión de campeonatos."
      );
      formRef.current.reset();
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      errors.forEach((errorL) => {
        toast.error(errorL);
      });
    }
  };

  const editValidate = async (data) => {
    try {
      await editChampionshipRequest(params.id, data);
      toast.success("Campeonato editado con éxito");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isUpdating) {
      await editValidate(data);
      return;
    }
    await addValidate(data);
  });

  useEffect(() => {
    const getValidateForEdit = async () => {
      try {
        if (isUpdating) {
          const res = await getOneChampionshipRequest(params.id);
          const { title, description, dateInit, dateEnd, open } =
            res.data;
          setValue("title", title);
          setValue("description", description);
          setValue("dateInit", dateInit);
          setValue("dateEnd", dateEnd);
          
          setIsEnabled(open);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error al cargar la válida");
      }
    };

    getValidateForEdit();
  }, []);

  const closeValidate = async () => {
    try {
      await closeChampionshipRequest(params.id);
      setIsEnabled(false);
      toast.success("Campeonato dashabilitado con éxito");
    } catch (error) {
      console.log(error);
      toast.error("Error al cerrar la validación");
    }
  };

  const openValidate = async () => {
    try {
      await openChampionshipRequest(params.id);
      setIsEnabled(true);
      toast.success("Campeonato habilitado con exito");
    } catch (error) {
      console.log(error);
      toast.error("Error al abrir la validación");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          {isUpdating ? "Actualizar" : "Agrega un nuevo"} Campeonato
        </h2>

        <form className="mt-8 space-y-6" onSubmit={onSubmit} ref={formRef}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="title" className="sr-only">
              Título
            </label>
            <input
              id="title"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Título"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label htmlFor="description" className="sr-only">
              Indicaciones
            </label>
            <textarea
              id="description"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Descripción"
              {...register("description", { required: true })}
            />
            {errors.indications && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label
              htmlFor="dateInit"
              className="block dark:text-white py-2 font-medium"
            >
              Fecha de Inicio
            </label>
            <input
              id="dateInit"
              type="date"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("dateInit", { required: true })}
            />
            {errors.dateInit && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label
              htmlFor="dateEnd"
              className="block dark:text-white py-2 font-medium"
            >
              Fecha de Finalización
            </label>
            <input
              id="dateEnd"
              type="date"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("dateEnd", { required: true })}
            />
            {errors.dateEnd && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}
            
          </div>
          {isUpdating ? (
            isEnabled ? (
              <div
                className="text-sm font-semibold text-green-600 dark:text-green-500"
                onClick={closeValidate}
              >
                Campeonato Habilitado
              </div>
            ) : (
              <div
                className="text-sm font-semibold text-red-600  dark:text-red-500"
                onClick={openValidate}
              >
                Campeonato Deshabilitado
              </div>
            )
          ) : null}
          {isUpdating && (
            <div className="px-6 pb-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={closeValidate}
                className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Deshabilitar
              </button>
              <button
                onClick={openValidate}
                className="bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
              >
                Habilitar
              </button>
            </div>
          )}
          <div className="flex gap-4">
            <button
              type="reset"
              onClick={() => navigate("/manage/championship")}
              className="bg-red-500 hover:bg-red-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isUpdating ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
