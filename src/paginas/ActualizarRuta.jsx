import { FormularioRuta } from '../componets/FormularioRuta';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Ruta</h1>
            <hr className='my-4' />
            <p className='mb-8'>Actualizar la información de la ruta</p>
            {
                Object.keys(ruta).length !== 0 ? (
                    <FormularioRuta ruta={ruta} onSubmit={actualizarRuta} />
                ) : (
                    Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                )
            }
        </div>
    );
};

export default ActualizarRuta;
