import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from './components/common/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
      <Route path='/' element={ <Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login" element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
