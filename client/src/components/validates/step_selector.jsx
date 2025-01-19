import PropTypes from "prop-types";
import RegisterStatus from "./register_status";
import InscriptionForm from "../inscription/inscription_form";
export default function StepSelector({ currentStep,nextStep,id_validate }) {
  switch (currentStep) {
    case 0:
      return <InscriptionForm nextStep={nextStep} id_validate={id_validate}/>;
    case 1:
      return <RegisterStatus isAccepted={false} />;
    case 2:
      return <RegisterStatus isAccepted={true} />;
    default:
      return <p className="text-xl font-bold">Error</p>;
  }
}

StepSelector.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  id_validate: PropTypes.string.isRequired,
};
