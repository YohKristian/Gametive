import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import HomePage from "./components/HomePage";
import DetailGame from "./components/DetailGame";
import SearchGames from "./components/SearchGames";
import SelectLocation from "./components/SelectLocation";
import EventRegistration from "./components/EventRegistration";
import NotFoundPage from "./pages/NotFoundPage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Authenticated({ children }) {
  const { access_token } = localStorage;
  if (access_token) return <Navigate to={"/home"} />;
  return children;
}

function RequireAuth({ children }) {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/home") return children;
  const { access_token } = localStorage;
  if (!access_token) return <Navigate to={"/login"} />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Authenticated>
            <LoginPage />
          </Authenticated>
        }
      />
      <Route
        path="/register"
        element={
          <Authenticated>
            <RegisterPage />
          </Authenticated>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="search" element={<SearchGames />} />
        <Route path="detail/:id" element={<DetailGame />} />
        <Route path="select" element={<SelectLocation />} />
        <Route path="event-registration" element={<EventRegistration />} />
        <Route path="" element={<Navigate to={"/home"} />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
