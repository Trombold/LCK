import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ListResults from "../components/results/list_results";
import { addResultRequest } from "../api/results";
import { getKartsInscribedRequest } from "../api/karts";

export default function ManageResultsFormPage() {
  const params = useParams();
  const navigate = useNavigate();
  const isUpdating = params.id ? true : false;
  const [results, setResults] = useState([]);
  const [kartsIncribed, setKartsInscibed] = useState([]);
  const [kartsFiltered, setKartsFiltered] = useState([]);
  const [category, setCategory] = useState("Junior");
  const [numberKart, setNumberKart] = useState(0);

  const formRef = useRef(null);
  const placedRef = useRef(null);
  const timeRef = useRef(null);
  const pointsRef = useRef(null);

  const getKartsIncribed = async () => {
    try {
      const res = await getKartsInscribedRequest();
      setKartsInscibed(res.data);
      const kartCategory = res.data.filter((k) => k.category === "jr");
      setKartsFiltered(kartCategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKartsIncribed();
  }, []);

  useEffect(() => {
    const numberPlace = results.length + 1;
    const pointsMap = {
      1: 15,
      2: 12,
      3: 10,
      4: 8,
      5: 7,
      6: 6,
      7: 5,
      8: 4,
      9: 3,
      10: 2,
      11: 1,
    };

    const points = pointsMap[numberPlace] || 0;
    pointsRef.current.value = points;
  }, [results]);

  useEffect(() => {
    const kartCategory = kartsIncribed.filter((k) => k.category === category);
    setKartsFiltered(kartCategory);
  }, [category]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const sendData = {
        title: data.title,
        category: data.category,
        results,
      };
      await addResultRequest(sendData);
      toast.success("Resultados guardados con éxito");
      setResults([]);
      formRef.current.reset();
    } catch (error) {
      console.log(error);
    }
  });

  const addResultToList = () => {
    const namePilot = kartsIncribed.find((k) => k.number === parseInt(numberKart));
    if (numberKart === 0) {
      toast.error("Debe seleccionar un kart");
      return;
    }
    const time = timeRef.current.value;

    if (!time) {
      toast.error("Debe agregar el tiempo");
      return;
    }
    setResults([
      ...results,
      {
        placed: placedRef.current.value,
        time,
        numberKart,
        name: namePilot.name,
        points: pointsRef.current.value,
      },
    ]);

    placedRef.current.value = "";
    timeRef.current.value = "";
    pointsRef.current.value = "";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white">
          {isUpdating ? "Actualizar" : "Agregar"} Resultados
        </h2>

        <form className="space-y-6" onSubmit={onSubmit} ref={formRef}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="sr-only">
                Título
              </label>
              <input
                id="title"
                className="appearance-none rounded-t-md w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Título"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Este campo es obligatorio</p>
              )}
              <select
                name="category"
                id="category"
                className="block w-full py-2 px-3 border border-t-0 border-gray-300 bg-white rounded-b-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                {...register("category", { required: true })}
                onChange={(e) => setCategory(e.target.value)}
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
            </div>
            <span className="block text-xl font-medium text-gray-700 dark:text-gray-300">
              Detalle de posición
            </span>
            <div className="space-y-2">
              <label
                htmlFor="kartsInscribed"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Posición
              </label>
              <input
                type="number"
                value={results.length + 1}
                ref={placedRef}
                readOnly
                className="w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                htmlFor="kartsInscribed"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Kart inscrito
              </label>
              <select
                name="nroKart"
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                onChange={(e) => setNumberKart(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {kartsFiltered.map((k) => (
                  <option key={k.number} value={k.number} name="kartsInscribed">
                    {k.number} - {k.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="time"
                placeholder="Tiempo"
                id="idtime"
                ref={timeRef}
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="number"
                name="points"
                id="idpoints"
                placeholder="Puntos"
                ref={pointsRef}
                readOnly
                className="w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-500 placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={addResultToList}
                className="bg-green-500 hover:bg-green-700 w-full py-2 px-4 rounded-md text-white"
              >
                Añadir
              </button>
            </div>
          </div>

          <div className="mt-4">
            <ListResults results={results} />
          </div>

          <div className="flex gap-4">
            <button
              type="reset"
              onClick={() => navigate("/results")}
              className="bg-red-500 hover:bg-red-700 w-full py-2 px-4 rounded-md text-white"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 w-full py-2 px-4 rounded-md text-white"
            >
              {isUpdating ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
