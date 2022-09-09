import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import HomePage from "./components/HomePage";
import DetailGame from "./components/DetailGame";
import SearchGames from "./components/SearchGames";
import SelectLocation from "./components/SelectLocation";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

function RequireAuth({ children }) {
  const { access_token } = localStorage;
  if (!access_token) return <Navigate to={"/login"} />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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
        <Route path="detail" element={<DetailGame />} />
        <Route path="select" element={<SelectLocation />} />
        <Route path="" element={<Navigate to={"/home"} />} />
      </Route>
    </Routes>
  );
}

export default App;
