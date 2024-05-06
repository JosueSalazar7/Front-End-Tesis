import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const VisualizarEncomienda = () => {
  const { id } = useParams();
  const [encomienda, setEncomienda] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarEncomienda = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/admin/encomienda/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setEncomienda(respuesta.data.encomienda);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.error, tipo: false });
      }
    };
    consultarEncomienda();
  }, []);

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Visualizar Encomienda
        </h1>
        <hr className="my-4" />
        <p className="mb-8">Detalles de la encomienda</p>
      </div>
      <div>
        {Object.keys(encomienda).length !== 0 ? (
          <div className="m-5">
             <p className="text-md text-gray-600 uppercase font-bold">
              Tipo de Boleto: {encomienda.tipoEncomienda}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Nombre: {encomienda.nombreRemitente}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Apellido: {encomienda.apellidoRemitente}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Ciudad de Salida: {encomienda.ciudadSalida}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Ciudad de Llegada: {encomienda.ciudadLlegada}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Horario: {encomienda.turno.horario}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Fecha: {encomienda.turno.fecha}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Número de Paquetes: {encomienda.numPaquetes}
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

export default VisualizarEncomienda;
