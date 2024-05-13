import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPerfil from "../componets/Perfil/CardPerfil";
import Mensaje from '../componets/Alertas/Mensaje';
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
        <>
            <div>
                <h1 className="font-black text-4xl text-gray-500 text-center">Perfil</h1>
                <hr className="my-4" />
                <p className="mb-8 text-center">Perfil de Usuario</p>
            </div>

            {error && <Mensaje tipo={false}>{error}</Mensaje>}

            {perfil && (
                <div>
                    <div className="flex justify-center">
                        <CardPerfil perfil={perfil} />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Link to={`/dashboard/actualizarPerfil/${perfil._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Actualizar Perfil
                        </Link>
                        <Link to="/dashboard/actualizarContrasena" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Actualizar Contraseña
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Perfil;
