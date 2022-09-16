import { Navigate } from "react-router-dom";

function ProtectedRouteNotLogin(props) {
    let auth = localStorage.access_token;

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    return props.children;
}

export default ProtectedRouteNotLogin;