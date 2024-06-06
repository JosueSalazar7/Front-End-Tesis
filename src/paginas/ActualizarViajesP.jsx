import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const ActualizarViajePrivado = () => {
  const { id } = useParams();
  const [datosActualizados, setDatosActualizados] = useState({
    conductorAsignado: "",
    estadoPax: ""
  });
  const [conductores, setConductores] = useState([]);
  const [mensaje, setMensaje] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosActualizados({
      ...datosActualizados,
      [name]: value
    });
  };

  const obtenerConductores = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/lista-conductores`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setConductores(respuesta.data);
    } catch (error) {
      console.error("Error al obtener la lista de conductores:", error);
    }
  };

  useEffect(() => {
    obtenerConductores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarPriv/${id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datosActualizados, options);
      setMensaje({ respuesta: "Estado del viaje privado actualizado correctamente", tipo: true });
      // Redirigir después de la actualización
      navigate('/dashboard/listar-viajes-privados');
    } catch (error) {
      setMensaje({ respuesta: error.response.data.error, tipo: false });
    }
  };

  return (
    <div className="mt-10 h-screen pt-40 items-start" >
      <h1 className="font-black text-6xl text-gray-500">Actualizar Viaje Privado</h1>
      <hr className="my-4" />
      <p className="mb-8">Este módulo te permite asignar un conductor al viaje privado</p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="conductorAsignado" className="block text-md text-gray-600 font-bold text-lg">Conductor asignado:</label>
          <select id="conductorAsignado" name="conductorAsignado" value={datosActualizados.conductorAsignado} onChange={handleChange} className="border border-gray-300 p-2 w-full">
            <option value="">Seleccionar conductor</option>
            {conductores.map(conductor => (
              <option key={conductor._id} value={conductor._id}>{conductor.conductorNombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="estadoPax" className="block text-md text-gray-600 font-bold text-lg">Estado del viaje privado:</label>
          <select id="estadoPax" name="estadoPax" value={datosActualizados.estadoPax} onChange={handleChange} className="border border-gray-300 p-2 w-full">
            <option value="">Seleccionar estado</option>
            <option value="Aprobado">Aprobado</option>
            <option value="En tránsito">En tránsito</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Actualizar</button>
          <Link to="/dashboard/listar-viajes-privados" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</Link>
        </div>
      </form>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
    </div>
  );
};

export default ActualizarViajePrivado;
