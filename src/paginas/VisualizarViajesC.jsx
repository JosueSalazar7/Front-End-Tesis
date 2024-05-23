import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import viajeCompartidoImg from "../assets/viaje.avif";

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
    <div className="relative">
      <Link
        to="/dashboard/listar-viajes-compartidos"
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

      <div className="mt-10 h-screen items-start text-center">
        <div className="text-center">
          <h1 className="font-black text-6xl text-gray-500">
            Visualizar Viaje Compartido
          </h1>
          <hr className="my-4" />
          <p className="mb-8 text-lg">Detalles del viaje compartido</p>
        </div>
        <div className="text-center flex justify-center">
          <div className="w-1/2 m-5 ">
            <img src={viajeCompartidoImg} alt="Viaje compartido" className="w-full" />
          </div>
          <div className="w-1/2 m-5 pt-24">
            <hr className="my-4" />
            <div className="m-5 space-y-4">
              {Object.keys(viajeCompartido).length !== 0 ? (
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Tipo de Boleto:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.tipoBoleto}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Nombre:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.nombre}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Apellido:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.apellido}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Ciudad de Salida:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.ciudadSalida}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Ciudad de Llegada:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.ciudadLlegada}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Horario:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.turno?.horario}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Fecha:</span>{" "}
                    <span className="text-blue-600">{viajeCompartido.turno?.fecha}</span>
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

export default VisualizarViajeCompartido;
