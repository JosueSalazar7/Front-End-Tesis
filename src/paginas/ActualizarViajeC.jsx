import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';

const ActualizarViajeCompartido = () => {
  const { id } = useParams();
  const [viajeCompartido, setViajeCompartido] = useState({});
  const [mensaje, setMensaje] = useState({});
  const [datosActualizados, setDatosActualizados] = useState({
    conductorAsignado: '',
    estadoPax: '',
  });
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    const obtenerViajeCompartido = async () => {
      try {
        const token = localStorage.getItem('token');
        const urlViajeCompartido = `${import.meta.env.VITE_BACKEND_URL}/admin/viajeC/${id}`;
        const urlConductores = `${import.meta.env.VITE_BACKEND_URL}/conductores`; // Suponiendo que hay una ruta para obtener todos los conductores
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const [respuestaViajeCompartido, respuestaConductores] = await Promise.all([
          axios.get(urlViajeCompartido, options),
          axios.get(urlConductores, options),
        ]);

        setViajeCompartido(respuestaViajeCompartido.data);
        setDatosActualizados(respuestaViajeCompartido.data);
        setConductores(respuestaConductores.data);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    obtenerViajeCompartido();
  }, []);

  const handleChange = (e) => {
    setDatosActualizados({ ...datosActualizados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarVC/${id}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(url, datosActualizados, options);
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };

  return (
    <div>
      <h1 className="font-black text-4xl text-gray-500">Actualizar Viaje Compartido</h1>
      <hr className="my-4" />
      <p className="mb-8">Actualizar la información del viaje compartido</p>
      {
        Object.keys(viajeCompartido).length !== 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="conductorAsignado" className="block text-gray-700 font-bold mb-2">Conductor asignado:</label>
              <select id="conductorAsignado" name="conductorAsignado" value={datosActualizados.conductorAsignado} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Selecciona un conductor</option>
                {conductores.map((conductor) => (
                  <option key={conductor._id} value={conductor._id}>{conductor.nombre}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="estadoPax" className="block text-gray-700 font-bold mb-2">Estado del pasajero:</label>
              <input type="text" id="estadoPax" name="estadoPax" value={datosActualizados.estadoPax} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Actualizar Viaje Compartido</button>
          </form>
        ) : (
          Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )
      }
    </div>
  );
};

export default ActualizarViajeCompartido;
