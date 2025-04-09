import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import DefaultLayout from "./components/DefaultLayout";
import DefaultLayout2 from "./components/DefaultLayout2";
import DefaultLayout3 from "./components/DefaultLayout3";
import DefaultLayout4 from "./components/DefaultLayout4";
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
import CadastrarRecebedorAdm from "./pages/CadastrarRecebedorAdm";
import Pedidoenviado from "./pages/Pedidoenviado";
import Minhassolicitacoes from "./pages/Minhassolicitacoes";
import Doacoes from "./pages/Doacoes";
import Pedidos from "./pages/Pedidos";

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
          <ProtectedRoute requiredRole="admin">
            <DefaultLayout2>
              <InicialAdministrador />
            </DefaultLayout2>
          </ProtectedRoute>
        }
      />

      <Route
        path="/adm/Doacoes"
        element={
          <ProtectedRoute requiredRole="admin">
            <DefaultLayout2>
              <Doacoes />
            </DefaultLayout2>
          </ProtectedRoute>
        }
      />

      <Route
        path="/adm/cadastrar-recebedor"
        element={
          <ProtectedRoute requiredRole="admin">
            <AuthLayout>
              <CadastrarRecebedorAdm />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/adm/Pedidos"
        element={
          <ProtectedRoute requiredRole="admin">
            <DefaultLayout2>
              <Pedidos />
            </DefaultLayout2>
          </ProtectedRoute>
        }
      />

      <Route
        path="/InicialColaborador"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <DefaultLayout3>
              <InicialColaborador />
            </DefaultLayout3>
          </ProtectedRoute>
        }
      />

      <Route
        path="/InicialRecebedor"
        element={
          <ProtectedRoute requiredRole="recebedor">
            <DefaultLayout4>
              <InicialRecebedor />
            </DefaultLayout4>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recebedor/Pedidoenviado"
        element={
          <ProtectedRoute requiredRole="recebedor">
            <DefaultLayout4>
              <Pedidoenviado />
            </DefaultLayout4>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recebedor/Minhassolicitacoes"
        element={
          <ProtectedRoute requiredRole="recebedor">
            <DefaultLayout4>
              <Minhassolicitacoes />
            </DefaultLayout4>
          </ProtectedRoute>
        }
      />


      {/* Página de erro */}
      <Route path="*" element={<h1 className="text-center py-5">Página não encontrada</h1>} />
    </Routes>
  );
}

export default App;