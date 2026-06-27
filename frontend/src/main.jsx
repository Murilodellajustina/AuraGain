import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom";

import Login from './pages/login.jsx';
import Cadastro from './pages/cadastro.jsx';
import PaginaInicial from './pages/paginaInicial.jsx';
import TelaCriarTreino from './pages/telaCriarTreino.jsx';
import AreaPersonal from "./pages/areaPersonal.jsx";
import CadastroPersonal from "./pages/cadastroPersonal.jsx";
import TelaIniciarTreino from "./pages/telaIniciarTreino.jsx";

const router = createHashRouter([
  { path: "/", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/cadastroPersonal", element: <CadastroPersonal />},
  { path: "/paginaInicial", element: <PaginaInicial /> },
  { path: "/telaCriarTreino", element: <TelaCriarTreino />},
  { path: "/areaPersonal", element: <AreaPersonal />},
  { path: "/telaIniciarTreino", element: <TelaIniciarTreino />}
],
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
