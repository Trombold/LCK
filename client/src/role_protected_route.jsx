import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./contexts/auth_context";

const RoleProtectedRoute = ({ element, roles }) => {
  const { user } = useAuth();

  return user && roles.includes(user.role) ? element : <Navigate to="/not-authorized" />;
};

export default RoleProtectedRoute;

RoleProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
