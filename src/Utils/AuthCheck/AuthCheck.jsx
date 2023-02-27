import { useUser } from "../../Contexts/userContext";
import { Navigate } from "react-router-dom";

export const AuthAvailabel = ({ children }) => {
  const { user } = useUser();
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export const AuthRequired = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
