import { Formulario } from '../componets/Formulario';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const Actualizar = () => {
    const { id } = useParams();
    const [conductor, setConductor] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarConductor = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/conductor/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setConductor(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarConductor();
    }, []);

    const actualizarConductor = async (datos) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarConductor/${id}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(url, datos, options);
            // Puedes redirigir al usuario a la página deseada después de actualizar el conductor aquí
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <div className="relative">
            <Link to="/dashboard/listar" className="left-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
            </Link>
            <div className="h-screen pt-32 items-start text-center">
                <div>
                    <h1 className='font-black text-center text-5xl text-gray-500'>Actualizar Conductor</h1>
                    <hr className='my-4' />
                    <p className='mb-8'>Actualizar la información del conductor</p>
                    {
                        Object.keys(conductor).length !== 0 ? (
                            <Formulario conductor={conductor} onSubmit={actualizarConductor} />
                        ) : (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Actualizar;
