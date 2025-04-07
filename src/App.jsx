import './App.scss';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import NavBar from './components/common/NavBar';
import Timeline from './pages/Timeline';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/create-post" element={<CreatePostPage />} />

        {/* <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } /> */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;