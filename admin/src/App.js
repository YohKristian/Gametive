import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EventPage from "./pages/EventPage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ProtectedRouteNotLogin from "./protected/ProtectedRouteNotLogin";
import ProtectedRouteAlreadyLogin from "./protected/ProtectedRouteAlreadyLogin";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRouteAlreadyLogin>
              <LoginPage />
            </ProtectedRouteAlreadyLogin>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteNotLogin>
              <MainPage />
            </ProtectedRouteNotLogin>
          }
        >
          <Route path="event" element={<EventPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="" element={<Navigate to={"/event"} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
