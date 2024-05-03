import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const VisualizarRuta = () => {
  const { id } = useParams();
  const [ruta, setRuta] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarRuta = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/admin/ruta/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setRuta(respuesta.data);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarRuta();
  }, []);

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Visualizar Ruta
        </h1>
        <hr className="my-4" />
        <p className="mb-8">Datos de la ruta</p>
      </div>
      <div>
        {Object.keys(ruta).length !== 0 ? (
          <div className="m-5">
            <p className="text-md text-gray-600 uppercase font-bold">
              Origen: {ruta.origen}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Destino: {ruta.destino}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Distancia: {ruta.distancia}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Duración: {ruta.duracion}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Descripción: {ruta.descripcion}
            </p>
            {/* Agrega aquí más detalles de la ruta si es necesario */}
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

export default VisualizarRuta;
