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
        <div className="max-w-xl mx-auto">
            <h1 className="font-black text-4xl text-gray-500 text-center mb-4">Actualizar Contraseña</h1>
            {mensaje && <Mensaje tipo={false}>{mensaje}</Mensaje>}
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="mb-3 relative">
                    <label className="mb-2 block text-sm font-semibold">Contraseña Actual</label>
                    <input
                        type={showPassword ? 'text' : 'password'} // Mostrar contraseña según el estado de showPassword
                        value={passwordActual}
                        onChange={(e) => setPasswordActual(e.target.value)}
                        className="block w-full rounded-md border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-gray-500 mb-4"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={toggleMostrarPassword} // Alternar el estado de mostrar contraseña
                    >
                        {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                    </button>
                </div>
                <div className="mb-3 relative">
                    <label className="mb-2 block text-sm font-semibold">Nueva Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'} // Mostrar contraseña según el estado de showPassword
                        value={passwordNuevo}
                        onChange={(e) => setPasswordNuevo(e.target.value)}
                        className="block w-full rounded-md border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-gray-500 mb-4"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={toggleMostrarPassword} // Alternar el estado de mostrar contraseña
                    >
                        {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                    </button>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Actualizar Contraseña
                </button>
            </form>
        </div>
    );
};

export default ActualizarContrasena;
