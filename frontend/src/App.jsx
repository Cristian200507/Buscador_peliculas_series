import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register"; // <-- Importamos Register
import Home from "./pages/Home";
import Detalle from "./pages/Detalle";

import ProtectedRoute from "./components/ProtectedRoute";
import { ContenidosProvider } from "./context/ContenidosContext";

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) setAuth(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuth(false);
  };

  return (
    <ContenidosProvider>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login onLogin={() => setAuth(true)} />}
        />

        {/* REGISTER - NO PROTEGIDO */}
        <Route
          path="/register"
          element={
            auth ? <Navigate to="/" /> : <Register /> // Redirige si ya está logueado
          }
        />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detalle/:id"
          element={
            <ProtectedRoute>
              <Detalle />
            </ProtectedRoute>
          }
        />

        {/* Si pone cualquier ruta no existente → Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ContenidosProvider>
  );
}
