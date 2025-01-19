import { useEffect, useState } from "react";
import Stepper from "../components/stepper";
import StepSelector from "../components/validates/step_selector";
import { getCurrentValidateRequest } from "../api/validates";
import { getInscriptionCurrentRequest } from "../api/inscriptions";
import { useAuth } from "../contexts/auth_context";

export default function ValidatesPage() {
  const steps = ["Registro", "Esperar Confirmación", "Confirmada"];
  const [valida, setValida] = useState(null);
  const [step, setStep] = useState(0);
  const {user} = useAuth();

  const nextStep = () => {
    setStep(step + 1);
  };

  const getValidaActive = async () => {
    try {
      const res = await getCurrentValidateRequest();
      setValida(res.data[0] || null);
    } catch (error) {
      console.log(error);
      setValida({});
    }
  };

  const getInscription = async () => {
    try {
      const res = await getInscriptionCurrentRequest(user.id);
      const ins = res.data[0] || null;
      if (ins === null) {
        setStep(0);
        return;
      }
      if(ins.state === "pending"){
        setStep(1);
        return;
      }
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getValidaActive();
    getInscription();
  }, []);

  if (valida === null)
    return (
      <main className="flex items-center justify-center h-screen w-screen p-4 md:p-8 bg-sky-50 dark:bg-gray-900">
        <span className="text-2xl font-semibold dark:text-white">
          No hay ninguna válida activa
        </span>
      </main>
    );

  return (
    <main className="firstlex flex-col p-4 md:p-8  bg-sky-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-8 dark:text-white">Válidas</h2>
      <Stepper steps={steps} currentStep={step} />
      <StepSelector currentStep={step} nextStep={nextStep} id_validate={valida._id}/>
    </main>
  );
}
