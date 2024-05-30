import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';

const ActualizarPerfil = () => {
    const { id } = useParams();
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
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
                setValue('adminNombre', respuesta.data.adminNombre);
                setValue('adminApellido', respuesta.data.adminApellido);
                setValue('phone', respuesta.data.phone);
            } catch (error) {
                console.error('Error al obtener el perfil');
            }
        };

        obtenerPerfil();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizar/${id}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, data, options);
            setSuccess(respuesta.data.msg);

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar el perfil');
        }
    };

    return (
            <div className="max-w-9xl mx-auto px-4 pt-40">
                <h1 className="font-black text-6xl text-gray-500 mb-8">Actualizar Perfil</h1>
                <p className='mb-8 '>Este modulo permite actualizar los datos el administrador</p>
                <div className="h-screen   w-full max-w-lg mx-auto justify-center">
                {success && <Mensaje tipo={true}>{success}</Mensaje>}
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="adminNombre">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="adminNombre"
                            {...register('adminNombre', { 
                                required: 'Campo Obligatorio',
                                minLength: { value: 5, message: 'El nombre debe tener al menos 5 caracteres' },
                                maxLength: { value: 20, message: 'El nombre debe tener como máximo 20 caracteres' }
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.adminNombre ? 'border-red-500' : ''}`}
                        />
                        {errors.adminNombre && <p className="text-red-500 text-sm">{errors.adminNombre.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="adminApellido">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="adminApellido"
                            {...register('adminApellido', { 
                                required: 'Campo Obligatorio',
                                minLength: { value: 5, message: 'El apellido debe tener al menos 5 caracteres' },
                                maxLength: { value: 20, message: 'El apellido debe tener como máximo 20 caracteres' }
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.adminApellido ? 'border-red-500' : ''}`}
                        />
                        {errors.adminApellido && <p className="text-red-500 text-sm">{errors.adminApellido.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="phone">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register('phone', { 
                                required: 'Campo Obligatorio',
                                minLength: { value: 10, message: 'El teléfono debe tener 10 dígitos' },
                                maxLength: { value: 10, message: 'El teléfono debe tener 10 dígitos' },
                                pattern: { value: /^\d+$/, message: 'El teléfono solo puede contener números' }
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
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
