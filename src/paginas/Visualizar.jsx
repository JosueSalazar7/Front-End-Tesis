import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

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
      <Link to="/dashboard/listar" className=" left-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </Link>
      
      <div className="mt-10 h-screen items-start text-center">
        <div className="text-center">
          <h1 className="font-black text-6xl text-gray-500">
            Visualizar Conductor
          </h1>
          <hr className="my-4" />
          <p className="mb-8 text-2xl">Datos del conductor</p>
        </div>
        <div className="text-center">
          {Object.keys(conductor).length !== 0 ? (
            <div className="m-5 space-y-4">
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Nombre del conductor:</span> <span className="text-blue-600">{conductor.conductorNombre}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Apellido del conductor:</span> <span className="text-blue-600">{conductor.conductorApellido}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Cédula:</span> <span className="text-blue-600">{conductor.cedula}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Correo:</span> <span className="text-blue-600">{conductor.correo}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Celular:</span> <span className="text-blue-600">{conductor.phone}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Número de asientos del vehículo:</span> <span className="text-blue-600">{conductor.numeroAsientos}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Placa del vehículo:</span> <span className="text-blue-600">{conductor.placaVehiculo}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Marca del vehículo:</span> <span className="text-blue-600">{conductor.marcaVehiculo}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Modelo del vehículo:</span> <span className="text-blue-600">{conductor.modeloVehiculo}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Año del vehículo:</span> <span className="text-blue-600">{conductor.anioVehiculo}</span>
              </p>
              <p className="text-lg uppercase font-bold">
                <span className="text-black-600">Color del vehículo:</span> <span className="text-blue-600">{conductor.colorVehiculo}</span>
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
  );
};

export default Visualizar;
