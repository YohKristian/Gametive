import {Routes,Route} from 'react-router-dom'
import EventPage from './pages/EventPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/event' element={<EventPage/>}/>
        <Route path='/game' element={<GamePage/>}/>
        <Route path='/user' element={<UserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
