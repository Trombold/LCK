import { useEffect, useState } from "react";
import { getInscriptionsCurrentRequest } from "../api/inscriptions";
import InscriptionCard from "../components/inscription/inscription_card";
import Loader from "../components/loader";

export default function InscriptionsPage() {
  const [inscriptions, setInscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await getInscriptionsCurrentRequest();
        setInscriptions(response.data||[]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching inscriptions:", error);
      }
    };

    fetchInscriptions();
  }, []);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="p-8 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Lista de Inscripciones
      </h1>
      {inscriptions.length === 0 ? (
        <p className="dark:text-white">
          No hay inscripciones activas en este momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inscriptions.map((inscription) => (
            <InscriptionCard key={inscription.id} inscription={inscription} />
          ))}
        </div>
      )}
    </div>
  );
}
