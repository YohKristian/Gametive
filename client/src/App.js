import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import DetailGame from "./components/DetailGame";
import SearchGames from "./components/SearchGames";
import SelectLocation from "./components/SelectLocation";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainPage />}>
        <Route path="search" element={<SearchGames />} />
        <Route path="detail" element={<DetailGame />} />
        <Route path="select" element={<SelectLocation />} />
      </Route>
    </Routes>
  );
}

export default App;
