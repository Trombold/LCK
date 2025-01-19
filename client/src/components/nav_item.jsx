// components/NavItem.jsx
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

const NavItem = ({ to, children }) => {
  const location = useLocation();

  return (
    <li>
      <Link
        to={to}
        className={clsx(
          "block py-2 px-3 rounded md:bg-transparent md:p-0",
          {
            "text-white bg-blue-700 md:text-blue-600 md:dark:text-blue-400":
              location.pathname === to,
            "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent":
              location.pathname !== to,
          }
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
