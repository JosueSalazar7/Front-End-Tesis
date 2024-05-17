import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error) {
            setError('Error al actualizar el perfil');
        }
    };

    return (
        <div className="h-screen pt-40  flex items-start justify-center">
            <div className="max-w-9xl mx-auto px-4">
                <h1 className="font-black text-7xl text-gray-500 text-center mb-8">Actualizar Perfil</h1>
                {error && <Mensaje tipo={false}>{error}</Mensaje>}
                {success && <Mensaje tipo={true}>{success}</Mensaje>}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="adminNombre">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="adminNombre"
                            name="adminNombre"
                            value={perfil.adminNombre}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="adminApellido">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="adminApellido"
                            name="adminApellido"
                            value={perfil.adminApellido}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="phone">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={perfil.phone}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Guardar Datos
                        </button>
                        <button onClick={() => window.location.href = '/dashboard'} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActualizarPerfil;
