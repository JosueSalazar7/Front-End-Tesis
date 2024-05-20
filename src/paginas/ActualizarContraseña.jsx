import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Mensaje from '../componets/Alertas/Mensaje';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const ActualizarContrasena = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [mensaje, setMensaje] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarpassword`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
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
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="passwordActual">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('passwordactual', { required: 'Campo Obligatorio' })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passwordactual ? 'border-red-500' : ''}`}
                                id="passwordActual"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                                onClick={toggleMostrarPassword}
                            >
                                {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                            </button>
                        </div>
                        {errors.passwordactual && <p className="text-red-500 text-sm">{errors.passwordactual.message}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="passwordNuevo">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('passwordnuevo', { required: 'Campo Obligatorio' })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passwordnuevo ? 'border-red-500' : ''}`}
                                id="passwordNuevo"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                                onClick={toggleMostrarPassword}
                            >
                                {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                            </button>
                        </div>
                        {errors.passwordnuevo && <p className="text-red-500 text-sm">{errors.passwordnuevo.message}</p>}
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
