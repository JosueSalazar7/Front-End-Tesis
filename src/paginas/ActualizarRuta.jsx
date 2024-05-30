import { FormularioRuta } from '../componets/FormularioRuta';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const ActualizarRuta = () => {
    const { id } = useParams();
    const [ruta, setRuta] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarRuta = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/ruta/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setRuta(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarRuta();
    }, []);

    const actualizarRuta = async (datos) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarRuta/${id}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(url, datos, options);
            // Aquí puedes redirigir al usuario a la página deseada después de actualizar la ruta
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <div className="relative">
            <Link to="/dashboard/listar-rutas" className=" left-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
            </Link>
            <div className="h-screen items-start">
            <h1 className='font-black text-6xl text-gray-500 mt-10'>Actualizar Ruta</h1>
            <hr className='my-4' />
            <p className='mb-8 '>Este módulo permite actualizar los datos de la ruta</p>
            {
                Object.keys(ruta).length !== 0 ? (
                    <FormularioRuta ruta={ruta} onSubmit={actualizarRuta} />
                ) : (
                    Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                )
            }
        </div>
        </div>
    );
};

export default ActualizarRuta;
