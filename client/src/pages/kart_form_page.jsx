import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kartSchema } from "../schemas/kart";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addKartRequest,
  editKartRequest,
  getOneKartRequest,
} from "../api/karts";
import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/auth_context";

export default function KartFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const isUpdating = params.id ? true : false;
  const { user } = useAuth();

  const formRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(kartSchema),
  });

  const addKart = async (data) => {
    try {
      await addKartRequest(data);
      toast.success("Kart agregado con éxito");
      formRef.current.reset();
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      errors.forEach((errorL) => {
        toast.error(errorL);
      });
    }
  };

  const editKart = async (data) => {
    try {
      await editKartRequest(params.id, data);
      toast.success("Kart editado con éxito");
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
      await editKart(data);
      return;
    }
    await addKart(data);
  });

  useEffect(() => {
    const getKartForEdit = async () => {
      try {
        if (isUpdating) {
          const res = await getOneKartRequest(params.id);
          const { category, number, haveTransponder } = res.data;

          setValue("category", category);
          setValue("number", number);
          setValue("haveTransponder", haveTransponder?"yes":"no");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error al cargar el kart");
      }
    };

    getKartForEdit();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          {isUpdating ? "Actualizar" : "Agrega un nuevo"} Kart
        </h2>
        <form className="mt-8 space-y-6" onSubmit={onSubmit} ref={formRef}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="hidden"
              {...register("emailUser", { value: user.email })}
            />
            <select
              name="category"
              id="category"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-t-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              {...register("category", { required: true })}
            >
              <option value="jr">Junior</option>
              <option value="x30m">X30 Master</option>
              <option value="x30s">X30 Senior</option>
              <option value="open">Open</option>
              <option value="parilla">Parilla</option>
              <option value="B&S">Briggs and Stratton</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
            <input
              id="number"
              type="number"
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Número de Kart"
              {...register("number", { required: true, valueAsNumber: true })}
            />
            {errors.number && (
              <>
                <p className="text-red-500">El número de kart es obligatorio</p>
              </>
            )}
            <label
              htmlFor="isOfApert"
              className="block dark:text-white py-2 font-medium"
            >
              Este kart tiene transponder propio?
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="yes"
                  {...register("haveTransponder", {
                    required: "Este campo es obligatorio",
                  })}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Si</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="no"
                  defaultChecked
                  {...register("haveTransponder", {
                    required: "Este campo es obligatorio",
                  })}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
              </label>
            </div>
            {errors.haveTransponder && (
              <p className="text-red-500">{errors.haveTransponder.message}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="reset"
              onClick={() => navigate("/karts")}
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
