import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import DefaultLayout from "./components/LayoutPadrao/Home/DefaultLayout";
import DefaultLayout2 from "./components/LayoutPadrao/Adm/DefaultLayout2";
import DefaultLayout3 from "./components/LayoutPadrao/Colaborador/DefaultLayout3";
import DefaultLayout4 from "./components/LayoutPadrao/Recebedor/DefaultLayout4";
import AuthLayout from "./components/LayoutPadrao/SemPadrao/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { DoacoesProvider } from "./context/DoacoesContext";

import Home from "./pages/Home/Home/Home";
import SobreNos from "./pages/Home/SobreNos/SobreNos";
import Colaboradores from "./pages/Home/Colaboradores/Colaboradores";
import Comoajudar from "./pages/Home/Comoajudar/Comoajudar";
import Contato from "./pages/Home/Contato/Contato";

import Login from "./pages/Entrar e Cadastrar/Login/Login";
import Cadastro from "./pages/Entrar e Cadastrar/Cadastro/Cadastro";

import InicialAdministrador from "./pages/Administrador/InicialAdm/InicialAdministrador";
import Doacoes from "./pages/Administrador/Doacoes/Doacoes";
import Pedidos from "./pages/Administrador/Pedidos/Pedidos";
import CadastrarRecebedorAdm from "./pages/Administrador/CadastrarRecebedor/CadastrarRecebedorAdm";

import InicialRecebedor from "./pages/Recebedor/InicialRecebedor/InicialRecebedor";
import Minhassolicitacoes from "./pages/Recebedor/Minhassolicitacoes/Minhassolicitacoes";
import Pedidoenviado from "./pages/Recebedor/Pedidoenviado/Pedidoenviado";

import InicialColaborador from "./pages/Colaborador/InicialColaborador/InicialColaborador";
import Registrardoacao from "./pages/Colaborador/Registrardoacao/Registrardoacao";
import Minhasdoacoes from "./pages/Colaborador/Minhasdoaçoes/Minhasdoacoes";
import Doacaoregistrada from "./pages/Colaborador/Doacaoregistrada/Doacaoregistrada";

function App() {
  return (
    <DoacoesProvider>
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
        path="/colaborador/Registrardoacao"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <DefaultLayout3>
              <Registrardoacao />
            </DefaultLayout3>
          </ProtectedRoute>
        }
      />

      <Route
        path="/colaborador/Doacaoregistrada"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <DefaultLayout3>
              <Doacaoregistrada />
            </DefaultLayout3>
          </ProtectedRoute>
        }
      />

      <Route
        path="/colaborador/Minhasdoacoes"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <DefaultLayout3>
              <Minhasdoacoes />
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
    </DoacoesProvider>
  );
}

export default App;