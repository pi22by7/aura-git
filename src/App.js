import './App.css';
import { NavBar } from './Components/Navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import NotFoundPage from './Pages/notFoundPage';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='events' element={<EventsPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='user' element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
