import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./layout/Auth";
import Login from "./paginas/Login";
import { LandinPage } from "./paginas/LandinPage";
import { RegisterAdmin } from "./paginas/RegisterAdmin";
import { Forgot } from "./paginas/Forgot";
import { NotFound } from "./paginas/NotFound";
import Dashboard from "./layout/Dashboard";
import Listar from "./paginas/Listar";
import Visualizar from "./paginas/Visualizar";
import Crear from "./paginas/Crear";
import Actualizar from "./paginas/Actualizar";
import Perfil from "./paginas/Perfil";
import { ConfirmarAdmin } from "./paginas/ConfirmarAdmin";
import { ConfirmarChofer } from "./paginas/ConfirmarChofer";
import Restablecer from "./paginas/Restablecer";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandinPage />} />

            <Route path="/" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterAdmin />} />
              <Route path="forgot/:id" element={<Forgot />} />
              <Route path="admin/confirmar/:token" element={<ConfirmarAdmin />} />
              <Route path="*" element={<NotFound />} />
              <Route path="admin/recuperar-password/:token" element={<Restablecer/>} />
            </Route>

            <Route
              path="dashboard/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route path="/"element={<Perfil />} />
                      <Route path="listar" element={<Listar />} />
                      <Route path="visualizar/:id" element={<Visualizar />} />
                      <Route path="crear" element={<Crear />} />
                      <Route path="actualizar/:id" element={<Actualizar />} />
                    </Route>
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
