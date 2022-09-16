import { Navigate } from "react-router-dom";

function ProtectedRouteAlreadyLogin(props) {
    let auth = localStorage.access_token;

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return props.children;
}

export default ProtectedRouteAlreadyLogin;