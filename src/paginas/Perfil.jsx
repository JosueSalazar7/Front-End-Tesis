import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import CardPerfil from "../componets/Perfil/CardPerfil";
import { Link } from 'react-router-dom';

const Perfil = () => {
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <div className="pt-20 items-start" >
            <div className="max-w-9xl mx-auto px-4">
                <h1 className="font-black text-6xl text-gray-500 mb-8">Perfil</h1>
                <hr className="my-4" />
                <p className="mb-8 ">Este módulo permite visualizar el perfil del usuario</p>
                <div className="h-screen flex items-start justify-center">
                {error && <Mensaje tipo={false}>{error}</Mensaje>}

                {perfil && (
                    <div>
                        <div className="flex justify-center">
                            <CardPerfil perfil={perfil} />
                        </div>
                        <div className="flex justify-center mt-4">
                            <Link to={`/dashboard/actualizarPerfil/${perfil._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md mr-4 text-lg">
                                Actualizar Perfil
                            </Link>
                            <Link to="/dashboard/actualizarContrasena" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md text-lg">
                                Actualizar Contraseña
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default Perfil;
