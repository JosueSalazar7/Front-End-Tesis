import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import viajeCompartidoImg from "../assets/viaje.avif";

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
    <div className="relative">
      <Link
        to="/dashboard/listar-viajes-privados"
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
          Visualizar Viaje Privado
        </h1>
        <hr className="my-4" />
        <p className="mb-8 text-lg">Este módulo permite visualizar los detalles del viaje privado</p>
      </div>
      <div className=" h-screen items-start pt-10">
        <div className="flex justify-center">
          <div className="w-1/3 ">
            <img src={viajeCompartidoImg} alt="Viaje privado" className="w-full" />
          </div>
          <div className="w-1/2 m-5">
            <hr className="my-4" />
            <div className="m-5 space-y-4">
              {Object.keys(viajePrivado).length !== 0 ? (
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Tipo de Boleto:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.tipoBoleto}</span>
                  </p>
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Nombre:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.nombre}</span>
                  </p>
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Apellido:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.apellido}</span>
                  </p>
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Ciudad de Salida:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.ciudadSalida}</span>
                  </p>
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Ciudad de Llegada:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.ciudadLlegada}</span>
                  </p>
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Horario:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.turno?.horario}</span>
                  </p>
                  <p className="text-2xl font-bold">
                    <span className="text-black-600">Fecha:</span>{" "}
                    <span className="text-blue-600">{viajePrivado.turno?.fecha}</span>
                  </p>
                  {/* Agregar más detalles según sea necesario */}
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

export default VisualizarViajePrivado;
