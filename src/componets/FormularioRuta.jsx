import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";

export const FormularioRuta = ({ ruta }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, reset } = useForm();
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        if (ruta) {
            reset({
                nombre: ruta.ruta.nombre,
                ciudad1: ruta.ruta.ciudad1,
                ciudad2: ruta.ruta.ciudad2,
                horario1: ruta.horario?.horario1,
                horario2: ruta.horario?.horario2,
                horario3: ruta.horario?.horario3,
            });
        }
    }, [ruta, reset]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            if (ruta?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarRuta/${ruta._id}`;
                await axios.put(url, data, options);
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registro-ruta`;
                await axios.post(url, data, options);
            }
            navigate('/dashboard/listar-rutas');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div className="mb-4">
                <label htmlFor='nombre' className='block text-gray-700 font-bold mb-2'>Nombre de la ruta:</label>
                <Controller
                    name='nombre'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        minLength: { value: 5, message: 'El campo "nombre de la ruta" debe tener al menos 5 caracteres' },
                        maxLength: { value: 20, message: 'El campo "nombre de la ruta" debe tener máximo 20 caracteres' },
                        pattern: { value: /^[a-zA-Z\s]*$/, message: 'El campo debe contener solo letras' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 p-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''} w-full !important`}
                                placeholder='Nombre de la ruta'
                                style={{ width: '100%' }}
                            />

                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor='ciudad1' className='block text-gray-700 font-bold mb-2'>Ciudad de origen:</label>
                <Controller
                    name='ciudad1'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        minLength: { value: 5, message: 'El campo "Ciudad 1" debe tener al menos 5 caracteres' },
                        maxLength: { value: 20, message: 'El campo "Ciudad 1" debe tener máximo 20 caracteres' },
                        pattern: { value: /^[a-zA-Z\s]*$/, message: 'El campo debe contener solo letras' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2  placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Ciudad de origen'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor='ciudad2' className='block text-gray-700 font-bold mb-2'>Ciudad de destino:</label>
                <Controller
                    name='ciudad2'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        minLength: { value: 5, message: 'El campo "Ciudad 2" debe tener al menos 5 caracteres' },
                        maxLength: { value: 20, message: 'El campo "Ciudad 2" debe tener máximo 20 caracteres' },
                        pattern: { value: /^[a-zA-Z\s]*$/, message: 'El campo debe contener solo letras' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Ciudad de destino'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor='horario1' className='block text-gray-700 font-bold mb-2'>Horario 1:</label>
                <Controller
                    name='horario1'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Horario 1'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor='horario2' className='block text-gray-700 font-bold mb-2'>Horario 2:</label>
                <Controller
                    name='horario2'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Horario 2'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor='horario3' className='block text-gray-700 font-bold mb-2'>Horario 3:</label>
                <Controller
                    name='horario3'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Horario 3'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div className="flex justify-center">
                <input
                    type="submit"
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg'
                    value={ruta?._id ? 'Actualizar ruta' : 'Registrar ruta'}
                />
            </div>
        </form>
    );
};
