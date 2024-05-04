import { Formulario } from '../components/Formulario';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Conductor</h1>
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
    );
};

export default Actualizar;
