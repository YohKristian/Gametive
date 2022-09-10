import { Routes, Route } from 'react-router-dom'
import EventPage from './pages/EventPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import ProtectedRouteNotLogin from "./protected/ProtectedRouteNotLogin";
import ProtectedRouteAlreadyLogin from "./protected/ProtectedRouteAlreadyLogin";
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={
          <ProtectedRouteAlreadyLogin>
            <LoginPage />
          </ProtectedRouteAlreadyLogin>
        } />
        <Route path='/' element={
          <ProtectedRouteNotLogin>
            <EventPage />
          </ProtectedRouteNotLogin>
        } />
        <Route path='/game' element={
          <ProtectedRouteNotLogin>
            <GamePage />
          </ProtectedRouteNotLogin>
        } />
        <Route path='/user' element={
          <ProtectedRouteNotLogin>
            <UserPage />
          </ProtectedRouteNotLogin>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
