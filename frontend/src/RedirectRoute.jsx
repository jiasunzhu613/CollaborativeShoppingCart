import { useContext } from "react";
import AuthContext from "./context/AuthProvider";
import { Navigate } from "react-router";

function RedirectRoute({ children }) {
    const { auth, loading } = useContext(AuthContext);
    console.log(loading);
    if (loading) return null;
    return auth?.session_id ? children : <Navigate to="/sign-in"></Navigate>;
}

export default RedirectRoute;
