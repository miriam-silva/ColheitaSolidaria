import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Footer from './components/Footer';

import Home from './pages/Home';
import SobreNos from './pages/SobreNos';
import Colaboradores from './pages/Colaboradores';
import ComoAjudar from './pages/ComoAjudar';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Navbar2 />
      
      <main className="flex-grow-1 py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<SobreNos />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/como-ajudar" element={<ComoAjudar />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<div className="text-center py-5"><h1>Página não encontrada</h1></div>} />
          </Routes>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
