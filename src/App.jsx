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
import RegistrarRuta from "./paginas/RegistrarRuta"; // Importa la página RegistrarRuta
import ListarRuta from "./paginas/ListarRuta"; // Importa la página ListarRuta
import VisualizarRuta from "./paginas/VisualizarRuta"; // Importa la página VisualizarRuta
import ActualizarRuta from "./paginas/ActualizarRuta"; // Importa la página ActualizarRuta
import ListarViajesCompartidos from "./paginas/ListarViajesC";
import VisualizarViajesCompartidos from "./paginas/VisualizarViajesC"; // Importa la página VisualizarViajesC
import ActualizarViajeC from "./paginas/ActualizarViajeC";
import ListarViajesPrivadosPendientes from "./paginas/ListarViajesP"
import VisualizarViajePrivado from "./paginas/VisualizarViajesP";
import ActualizarViajePrivado from "./paginas/ActualizarViajesP";
import ListarEncomiendas from "./paginas/ListarEncomiendas";
import VisualizarEncomienda from "./paginas/VisualizarEncomienda";
import ActualizarEncomienda from "./paginas/ActualizarEncomienda";
import ListarPasajeros from "./paginas/ListarPasajeros";
import ActualizarPerfil from './paginas/ActualizarPerfil';

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
              <Route path="chofer/confirmar/:token" element={<ConfirmarChofer />} />
              <Route path="*" element={<NotFound />} />
              <Route path="admin/recuperar-password/:token" element={<Restablecer />} />
            </Route>

            <Route
              path="dashboard/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Perfil />} />
                      <Route path="listar" element={<Listar />} />
                      <Route path="visualizar/:id" element={<Visualizar />} />
                      <Route path="crear" element={<Crear />} />
                      <Route path="actualizar/:id" element={<Actualizar />} />
                      <Route path="registrar-ruta" element={<RegistrarRuta />} /> {/* Agrega la ruta para registrar una nueva ruta */}
                      <Route path="listar-rutas" element={<ListarRuta />} /> {/* Agrega la ruta para listar las rutas */}
                      <Route path="visualizarRuta/:id" element={<VisualizarRuta />} /> {/* Agrega la ruta para visualizar una ruta */}
                      <Route path="actualizarRuta/:id" element={<ActualizarRuta />} /> {/* Agrega la ruta para actualizar una ruta */}
                      <Route path="listar-viajes-compartidos" element={<ListarViajesCompartidos />} /> {/* Agrega la ruta para listar los viajes compartidos */}
                      <Route path="visualizarViajeCompartido/:id" element={<VisualizarViajesCompartidos />} /> {/* Agrega la ruta para visualizar un viaje compartido */}
                      <Route path="actualizarViajeCompartido/:id" element={<ActualizarViajeC />} />
                      <Route path="listar-viajes-privados" element={<ListarViajesPrivadosPendientes />} />  
                      <Route path="visualizarViajePrivado/:id" element={<VisualizarViajePrivado />} />                 
                      <Route path="actualizarViajePrivado/:id" element={<ActualizarViajePrivado />} />                 
                      <Route path="listar-encomiendas" element={<ListarEncomiendas />} />                 
                      <Route path="visualizarEncomienda/:id" element={<VisualizarEncomienda />} />
                      <Route path="actualizarEncomienda/:id" element={<ActualizarEncomienda />} />
                      <Route path="listar-pasajeros" element={<ListarPasajeros />} />
                      <Route path="actualizarPerfil/:id" element={<ActualizarPerfil />} />
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
