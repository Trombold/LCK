import PropTypes from "prop-types";
import cx from "clsx";

export default function ImageUser({ image, name, lastname, licencia, forNavigate }) {
  const renderImage = () => {
    if (image) {
      return (
        <img
          src={image}
          alt="profile"
          className={cx(
            "rounded-full object-cover",
            forNavigate && "w-10 h-10",
            !forNavigate && "w-40 h-40"
          )}
        />
      );
    } else {
      return (
        <div
          className={cx(
            "rounded-full dark:bg-blue-600 flex justify-center items-center",
            forNavigate && "w-10 h-10",
            !forNavigate && "w-40 h-40"
          )}
        >
          <span
            className={cx(
              "text-center dark:text-gray-100",
              forNavigate && "text-md",
              !forNavigate && "text-6xl"
            )}
          >
            {name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      {renderImage()}
      {forNavigate && (
        <span>
          {name} {lastname}
        </span>
      )}
    </div>
  );
}

ImageUser.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  lastname: PropTypes.string,
  licencia: PropTypes.string,
  forNavigate: PropTypes.bool,
};
