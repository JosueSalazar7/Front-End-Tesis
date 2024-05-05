import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const VisualizarViajeCompartido = () => {
  const { id } = useParams();
  const [viajeCompartido, setViajeCompartido] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarViajeCompartido = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/admin/viajeC/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setViajeCompartido(respuesta.data.boleto);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.error, tipo: false });
      }
    };
    consultarViajeCompartido();
  }, []);

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Visualizar Viaje Compartido
        </h1>
        <hr className="my-4" />
        <p className="mb-8">Datos del viaje compartido</p>
      </div>
      <div>
        {Object.keys(viajeCompartido).length !== 0 ? (
          <div className="m-5">
            <p className="text-md text-gray-600 uppercase font-bold">
              Tipo de Boleto: {viajeCompartido.tipoBoleto}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Nombre del Pasajero: {viajeCompartido.nombre}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Apellido del Pasajero: {viajeCompartido.apellido}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Ciudad de Origen: {viajeCompartido.ciudadSalida}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Ciudad de Destino: {viajeCompartido.ciudadLlegada}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Turno: {viajeCompartido.turno}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Número de Pasajeros: {viajeCompartido.numPax}
            </p>
          </div>
        ) : (
          Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )
        )}
      </div>
    </>
  );
};

export default VisualizarViajeCompartido;
