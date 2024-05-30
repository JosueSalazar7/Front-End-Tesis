import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import chofer from "../assets/chofer5.png"; // Asumiendo que 'chofer.png' está en la carpeta de assets

const Visualizar = () => {
  const { id } = useParams();
  const [conductor, setConductor] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarConductor = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/admin/conductor/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setConductor(respuesta.data);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarConductor();
  }, []);

  return (
    <div className="relative">
      <Link
        to="/dashboard/listar"
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

        <div className="mt-10">
          <h1 className="font-black text-6xl text-gray-500">
            Visualizar Conductor
          </h1>
          <hr className="my-4" />
          <p className='mb-8'>Este modulo permite visualizar los datos del conductor y su vehículo</p>
          
        </div>
        <div className=" h-screen items-start ">
        <div className=" flex justify-center">
          <div className="w-1/2 m-5 pt-20">
            <img src={chofer} alt="Conductor" className="w-full" />
          </div>
          <div className="w-1/2 m-5 ">
            <hr className="my-4" />
            <div className="m-5 space-y-4">
              {Object.keys(conductor).length !== 0 ? (
                <>
                  <div className="bg-white shadow-md p-4 rounded-lg">
                    <p className="text-4xl font-bold mb-2">
                      Datos del conductor
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Nombre:</span>{" "}
                      <span className="text-blue-600">
                        {conductor.conductorNombre}
                      </span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Apellido:</span>{" "}
                      <span className="text-blue-600">
                        {conductor.conductorApellido}
                      </span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Cédula:</span>{" "}
                      <span className="text-blue-600">{conductor.cedula}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Correo:</span>{" "}
                      <span className="text-blue-600">{conductor.correo}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Celular:</span>{" "}
                      <span className="text-blue-600">{conductor.phone}</span>
                    </p>
                  </div>
                  <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                    <p className="text-4xl font-bold mb-2">
                      Datos del vehículo
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Número de asientos:</span>{" "}
                      <span className="text-blue-600">{conductor.numeroAsientos}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Placa:</span>{" "}
                      <span className="text-blue-600">{conductor.placaVehiculo}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Marca:</span>{" "}
                      <span className="text-blue-600">{conductor.marcaVehiculo}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Modelo:</span>{" "}
                      <span className="text-blue-600">{conductor.modeloVehiculo}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Año:</span>{" "}
                      <span className="text-blue-600">{conductor.anioVehiculo}</span>
                    </p>
                    <p className="text-2xl font-bold">
                      <span className="text-black-600">Color:</span>{" "}
                      <span className="text-blue-600">{conductor.colorVehiculo}</span>
                    </p>
                  </div>
                </>
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

export default Visualizar;
