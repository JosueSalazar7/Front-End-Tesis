import { useParams } from "react-router-dom";
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
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">
          Visualizar Conductor
        </h1>
        <hr className="my-4" />
        <p className="mb-8">Datos del conductor</p>
      </div>
      <div>
        {Object.keys(conductor).length !== 0 ? (
          <div className="m-5">
            <p className="text-md text-gray-600 uppercase font-bold">
              Nombre del conductor: {conductor.conductorNombre}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Apellido del conductor: {conductor.conductorApellido}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Cédula: {conductor.cedula}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Correo: {conductor.correo}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Celular: {conductor.phone}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Numero de asientos del vehiculo: {conductor.numeroAsientos}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Placa del vehiculo: {conductor.placaVehiculo}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Marca del vehiculo: {conductor.marcaVehiculo}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Modelo del vehiculo: {conductor.modeloVehiculo}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Año del vehiculo: {conductor.anioVehiculo}
            </p>
            <p className="text-md text-gray-600 uppercase font-bold">
              Color del vehiculo: {conductor.colorVehiculo}
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

export default Visualizar;
