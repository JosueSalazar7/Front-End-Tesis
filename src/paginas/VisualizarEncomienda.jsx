import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import encomiendasImg from "../assets/encomiendas.jpg";

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
    <div className="relative">
      <Link
        to="/dashboard/listar-encomiendas"
        className="left-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <svg
          className="h-6 w-6 inline-block mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver
      </Link>
      
      
        <div className="pt-20">
          <h1 className="font-black text-6xl text-gray-500">
            Visualizar Encomienda
          </h1>
          <hr className="my-4" />
          <p className="mb-8 text-lg">Este módulo permite visualizar los detalles de la encomienda</p>
        </div>
        <div className="h-screen items-start">
        <div className="flex justify-center">
          <div className="w-1/3 pt-20 ">
            <img src={encomiendasImg} alt="Encomienda" className="w-full" />
          </div>
          <div className="w-1/2 m-5 pt-5">
            <hr className="my-4" />
            <div className="m-5 space-y-4">
              {Object.keys(encomienda).length !== 0 ? (
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Tipo de Encomienda:</span>{" "}
                    <span className="text-blue-600">{encomienda.tipoEncomienda}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Nombre del Remitente:</span>{" "}
                    <span className="text-blue-600">{encomienda.nombreRemitente}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Apellido del Remitente:</span>{" "}
                    <span className="text-blue-600">{encomienda.apellidoRemitente}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Ciudad de Salida:</span>{" "}
                    <span className="text-blue-600">{encomienda.ciudadSalida}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Ciudad de Llegada:</span>{" "}
                    <span className="text-blue-600">{encomienda.ciudadLlegada}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Horario:</span>{" "}
                    <span className="text-blue-600">{encomienda.turno?.horario}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Fecha:</span>{" "}
                    <span className="text-blue-600">{encomienda.turno?.fecha}</span>
                  </p>
                  <p className="text-2xl ">
                    <span className="text-black-600 font-bold">Número de Paquetes:</span>{" "}
                    <span className="text-blue-600">{encomienda.numPaquetes}</span>
                  </p>
                </div>
              ) : (
                Object.keys(mensaje).length > 0 && (
                  <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizarEncomienda;
