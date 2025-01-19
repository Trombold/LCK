import cx from "clsx";
import PropTypes from "prop-types";

export default function RegisterStatus({ isAccepted }) {
  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div
        className={cx(
          "p-4 rounded-md text-center",
          { "bg-yellow-100 text-yellow-800": !isAccepted },
          { "bg-green-100 text-green-800": isAccepted }
        )}
      >
        {isAccepted
          ? "La inscripción ha sido aceptada, usted está inscrito en la presente válida. ¡Gracias!"
          : "Se ha registrado exitosamente su inscripción, espere a la verificación de su inscripción, esto puede llevar algunos días, gracias. Nota: Si la inscripción es rechazada usted deberá volver a inscribirse."}
      </div>
    </div>
  );
}

RegisterStatus.propTypes = {
  isAccepted: PropTypes.bool,
};
