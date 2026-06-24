import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom";

import Login from './pages/login.jsx';
import Cadastro from './pages/cadastro.jsx';
import PaginaInicial from './pages/paginaInicial.jsx';
import TelaCriarTreino from './pages/telaCriarTreino.jsx';

const router = createHashRouter([
  { path: "/", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/paginaInicial", element: <PaginaInicial /> },
  { path: "/telaCriarTreino", element: <TelaCriarTreino />}
],
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
