import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa solo useParams
import Mensaje from '../componets/Alertas/Mensaje';

const ActualizarPerfil = () => {
    const { id } = useParams();
    const [perfil, setPerfil] = useState({
        adminNombre: '',
        adminApellido: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/perfil`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setPerfil(respuesta.data);
            } catch (error) {
                setError('Error al obtener el perfil');
            }
        };

        obtenerPerfil();
    }, []);

    const handleChange = e => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizar/${id}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, perfil, options);
            setSuccess(respuesta.data.msg);

            setTimeout(() => {
                window.location.href = '/dashboard'; // Utiliza window.location.href para redirigir
            }, 2000);
        } catch (error) {
            setError('Error al actualizar el perfil');
        }
    };

    return (
        <>
            <div>
                <h1 className="font-black text-4xl text-gray-500 text-center">Actualizar Perfil</h1>
                <hr className="my-4" />
            </div>

            {error && <Mensaje tipo={false}>{error}</Mensaje>}
            {success && <Mensaje tipo={true}>{success}</Mensaje>}

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <label htmlFor="adminNombre">Nombre</label>
                <input type="text" id="adminNombre" name="adminNombre" value={perfil.adminNombre} onChange={handleChange} className="mb-4 p-2 border" />

                <label htmlFor="adminApellido">Apellido</label>
                <input type="text" id="adminApellido" name="adminApellido" value={perfil.adminApellido} onChange={handleChange} className="mb-4 p-2 border" />

                <label htmlFor="phone">Teléfono</label>
                <input type="text" id="phone" name="phone" value={perfil.phone} onChange={handleChange} className="mb-4 p-2 border" />

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Guardar Datos
                </button>
            </form>
        </>
    );
};

export default ActualizarPerfil;
