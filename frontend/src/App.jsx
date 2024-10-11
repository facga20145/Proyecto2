import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import './App.css';
import Admin from './components/Admin/Admin.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
