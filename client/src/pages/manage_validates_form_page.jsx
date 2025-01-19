import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { addValidateRequest, closeValidateRequest, editValidateRequest, getOneValidateRequest, openValidateRequest } from "../api/validates";

export default function ManageValidateFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const isUpdating = params.id ? true : false;
  const [isEnabled,setIsEnabled] = useState(false);

  const formRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addValidate = async (data) => {
    try {
      await addValidateRequest(data);
      toast.success("Válida agregada con exito, para habilitar la válida debe ir a editar en el panel de gestión de válidas.");
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
      await editValidateRequest(params.id, data);
      toast.success("Válida editada con éxito");
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
          const res = await getOneValidateRequest(params.id);
          const { title, indications, dateInit, timeInit, dateEnd,open,isOfApert } = res.data;
          setValue("title", title);
          setValue("indications", indications);
          setValue("dateInit", dateInit);
          setValue("timeInit", timeInit);
          setValue("dateEnd", dateEnd);
          setValue("isOfApert", isOfApert);
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
      await closeValidateRequest(params.id);
      setIsEnabled(false);
      toast.success("Válida dashabilitada con éxito");
    } catch (error) {
      console.log(error);
      toast.error("Error al cerrar la validación");
    }
  };

  const openValidate = async () => {
    try {
      await openValidateRequest(params.id);
      setIsEnabled(true);
      toast.success("Válida habilitada con exito");
    } catch (error) {
      console.log(error);
      toast.error("Error al abrir la validación");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          {isUpdating ? "Actualizar" : "Agrega una nueva"} Válida
        </h2>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit} ref={formRef}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="title" className="sr-only">Título</label>
            <input
              id="title"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Título"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label htmlFor="indications" className="sr-only">Indicaciones</label>
            <textarea
              id="indications"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Indicaciones"
              {...register("indications", { required: true })}
            />
            {errors.indications && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label htmlFor="dateInit" className="block dark:text-white py-2 font-medium">Fecha de Inicio</label>
            <input
              id="dateInit"
              type="date"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("dateInit", { required: true })}
            />
            {errors.dateInit && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label htmlFor="timeInit" className="block dark:text-white py-2 font-medium">Hora de Inicio</label>
            <input
              id="timeInit"
              type="time"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("timeInit", { required: true })}
            />
            {errors.timeInit && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}

            <label htmlFor="dateEnd" className="block dark:text-white py-2 font-medium">Fecha de Finalización</label>
            <input
              id="dateEnd"
              type="date"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("dateEnd", { required: true })}
            />
            {errors.dateEnd && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}
            <label
              htmlFor="isOfApert"
              className="block dark:text-white py-2 font-medium"
            >
              Esta válida es de apertura?
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="yes"
                  defaultChecked
                  {...register("isOfApert", {
                    required: "This field is required",
                  })}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Si
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="no"
                  {...register("isOfApert", {
                    required: "This field is required",
                  })}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  No
                </span>
              </label>
            </div>
            {errors.isOfApert && (
              <p className="text-red-500">Este campo es obligatorio</p>
            )}
          </div>
          {isUpdating ? isEnabled ? (
          <div
            className="text-sm font-semibold text-green-600 dark:text-green-500"  
            onClick={closeValidate}
          >
            Válida Habilitada
          </div>
        ) : ( 
          <div
            className="text-sm font-semibold text-red-600  dark:text-red-500"  
            onClick={openValidate}
          >
            Válida Deshabilitada
          </div>
        ) : null}
          {isUpdating && (
            <div className="px-6 pb-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={closeValidate}
              to={`/karts/${params.id}`}
              className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Deshabilitar
            </button>
            <button
              onClick={openValidate}
              to={`/karts/${params.id}`}
              className="bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            >
              Habilitar
            </button>
          </div>
          )}
          <div className="flex gap-4">
            <button
              type="reset"
              onClick={() => navigate("/manage/validates")}
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
