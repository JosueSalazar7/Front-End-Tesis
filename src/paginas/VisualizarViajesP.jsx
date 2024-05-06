import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const VisualizarViajePrivado = () => {
  const { id } = useParams();
  const [viajePrivado, setViajePrivado] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarViajePrivado = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/admin/viajePriv/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setViajePrivado(respuesta.data.boleto);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.error, tipo: false });
      }
    };
    consultarViajePrivado();
  }, []);

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Visualizar Viaje Privado
        </h1>
        <hr className="my-4" />
        <p className="mb-8">Detalles del viaje privado</p>
      </div>
      <div>
        {Object.keys(viajePrivado).length !== 0 ? (
          <div className="m-5">
            <p className="text-md text-gray-600 uppercase font-bold">
              Tipo de Boleto: {viajePrivado.tipoBoleto}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Nombre: {viajePrivado.nombre}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Apellido: {viajePrivado.apellido}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Ciudad de Salida: {viajePrivado.ciudadSalida}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Ciudad de Llegada: {viajePrivado.ciudadLlegada}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Horario: {viajePrivado.turno.horario}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Fecha: {viajePrivado.turno.fecha}
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

export default VisualizarViajePrivado;
