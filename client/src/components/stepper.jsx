import PropTypes from "prop-types";
import cx from "clsx";

const Stepper = ({ steps, currentStep }) => {

  return (
    <div className="w-full mx-auto mt-10">
      <div className="flex items-center justify-between mb-4 font-medium">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div
              className={cx(
                "w-8 h-8 rounded-full flex items-center justify-center mx-auto",
                {
                  "bg-blue-500 text-white": index <= currentStep,
                  "bg-gray-300 text-gray-500": index > currentStep,
                }
              )}
            >
              {index + 1}
            </div>
            <div
              className={cx("text-center mt-2", {
                "text-blue-500": index <= currentStep,
                "text-gray-500": index > currentStep,
              })}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Stepper;
