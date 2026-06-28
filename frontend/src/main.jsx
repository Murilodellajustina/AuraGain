import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom";
import './Services/i18n.js';

import Login from './pages/login.jsx';
import Cadastro from './pages/cadastro.jsx';
import PaginaInicial from './pages/paginaInicial.jsx';
import TelaCriarTreino from './pages/telaCriarTreino.jsx';
import AreaPersonal from "./pages/areaPersonal.jsx";
import CadastroPersonal from "./pages/cadastroPersonal.jsx";
import TelaIniciarTreino from "./pages/telaIniciarTreino.jsx";
import TelaCriarTreinoAluno from "./pages/telaCriarTreinoAluno.jsx";
import Perfil from "./pages/perfil.jsx";
import TelaEditarTreino from "./pages/telaEditarTreino.jsx";

const router = createHashRouter([
  { path: "/", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/cadastroPersonal", element: <CadastroPersonal />},
  { path: "/paginaInicial", element: <PaginaInicial /> },
  { path: "/telaCriarTreino", element: <TelaCriarTreino />},
  { path: "/areaPersonal", element: <AreaPersonal />},
  { path: "/telaIniciarTreino", element: <TelaIniciarTreino />},
  { path: "/telaCriarTreinoAluno", element: <TelaCriarTreinoAluno />},
  { path: "/perfil", element: <Perfil /> },
  { path: "/telaEditarTreino", element: <TelaEditarTreino /> }
],
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
