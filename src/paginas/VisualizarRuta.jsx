import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import ruta1 from "../assets/ruta.jpg";

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
    <div className="relative">
      <Link
        to="/dashboard/listar-rutas"
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
            Visualizar Ruta
          </h1>
          <hr className="my-4" />
          <p className="mb-8 text-lg">Detalles de la ruta</p>
        </div>
        <div className="text-center flex justify-center">
          <div className="w-1/2 m-5 ">
            <img src={ruta1} alt="Conductor" className="w-full" />
          </div>
          <div className="w-1/2 m-5 pt-24">
            <hr className="my-4" />
            <div className="m-5 space-y-4">
              {Object.keys(ruta).length !== 0 ? (
                <div className="bg-white shadow-md p-4 rounded-lg">
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Nombre de la ruta:</span>{" "}
                    <span className="text-blue-600">{ruta.ruta?.nombre}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Ciudad de origen:</span>{" "}
                    <span className="text-blue-600">{ruta.ruta?.ciudad1}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Ciudad de destino:</span>{" "}
                    <span className="text-blue-600">{ruta.ruta?.ciudad2}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Primer horario:</span>{" "}
                    <span className="text-blue-600">{ruta.horario?.horario1}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Segundo horario:</span>{" "}
                    <span className="text-blue-600">{ruta.horario?.horario2}</span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-black-600">Tercer horario:</span>{" "}
                    <span className="text-blue-600">{ruta.horario?.horario3}</span>
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

export default VisualizarRuta;
