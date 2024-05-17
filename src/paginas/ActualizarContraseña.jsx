import React, { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const ActualizarContrasena = () => {
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNuevo, setPasswordNuevo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarpassword`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const data = {
                passwordactual: passwordActual,
                passwordnuevo: passwordNuevo
            };
            const respuesta = await axios.put(url, data, options);
            setMensaje(respuesta.data.msg);
        } catch (error) {
            if (error.response) {
                setMensaje(error.response.data.msg);
            } else {
                setMensaje('Error al procesar la solicitud');
            }
        }
    };

    const toggleMostrarPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen pt-48  flex items-start justify-center">
            <div className="max-w-9xl mx-auto px-4">
                <h1 className="font-black text-7xl text-gray-500 text-center mb-8">Actualizar Contraseña</h1>
                {mensaje && <Mensaje tipo={false}>{mensaje}</Mensaje>}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="passwordActual">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Mostrar contraseña según el estado de showPassword
                                value={passwordActual}
                                onChange={(e) => setPasswordActual(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="passwordActual"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                                onClick={toggleMostrarPassword} // Alternar el estado de mostrar contraseña
                            >
                                {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="passwordNuevo">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Mostrar contraseña según el estado de showPassword
                                value={passwordNuevo}
                                onChange={(e) => setPasswordNuevo(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="passwordNuevo"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                                onClick={toggleMostrarPassword} // Alternar el estado de mostrar contraseña
                            >
                                {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Actualizar Contraseña
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

export default ActualizarContrasena;
