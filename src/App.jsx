import { Routes, Route } from "react-router-dom"; // REMOVA BrowserRouter
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import DefaultLayout from "./components/DefaultLayout";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";
import Colaboradores from "./pages/Colaboradores";
import Comoajudar from "./pages/Comoajudar";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import InicialAdministrador from "./pages/InicialAdministrador";
import InicialRecebedor from "./pages/InicialRecebedor";
import InicialColaborador from "./pages/InicialColaborador";

function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/sobre" element={<DefaultLayout><SobreNos /></DefaultLayout>} />
      <Route path="/colaboradores" element={<DefaultLayout><Colaboradores /></DefaultLayout>} />
      <Route path="/como-ajudar" element={<DefaultLayout><Comoajudar /></DefaultLayout>} />
      <Route path="/contato" element={<DefaultLayout><Contato /></DefaultLayout>} />

      {/* Páginas sem Navbar e Footer */}
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/cadastro" element={<AuthLayout><Cadastro /></AuthLayout>} />

      {/* Páginas protegidas */}
      <Route 
        path="/InicialAdministrador" 
        element={
          <ProtectedRoute requiredRole="administrador">
            <InicialAdministrador />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/InicialColaborador" 
        element={
          <ProtectedRoute requiredRole="colaborador">
            <InicialColaborador />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/InicialRecebedor" 
        element={
          <ProtectedRoute requiredRole="recebedor">
            <InicialRecebedor />
          </ProtectedRoute>
        }
      />

      {/* Página de erro */}
      <Route path="*" element={<h1 className="text-center py-5">Página não encontrada</h1>} />
    </Routes>
  );
}

export default App;
