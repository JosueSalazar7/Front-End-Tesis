import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import Mensaje from './Alertas/Mensaje';

export const FormularioRegistroAdmin = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, reset } = useForm();
    const [mensaje, setMensaje] = useState({});

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/register`;
            const respuesta = await axios.post(url, data);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            // Redirigir a la página de administrador después del registro exitoso
            navigate('/dashboard');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label htmlFor='adminNombre' className='text-gray-700 font-bold text-lg'>Nombre: </label>
                <Controller
                    name='adminNombre'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        minLength: { value: 5, message: 'El campo "Nombre" debe tener al menos 5 caracteres' },
                        maxLength: { value: 20, message: 'El campo "Nombre" debe tener máximo 20 caracteres' },
                        pattern: { value: /^[a-zA-Z\s]*$/, message: 'El campo "Nombre" debe contener solo letras' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Nombre'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='adminApellido' className='text-gray-700 font-bold text-lg'>Apellido: </label>
                <Controller
                    name='adminApellido'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        minLength: { value: 5, message: 'El campo "Apellido" debe tener al menos 5 caracteres' },
                        maxLength: { value: 20, message: 'El campo "Apellido" debe tener máximo 20 caracteres' },
                        pattern: { value: /^[a-zA-Z\s]*$/, message: 'El campo "Apellido" debe contener solo letras' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Apellido'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='correo' className='text-gray-700 font-bold text-lg'>Correo Electrónico: </label>
                <Controller
                    name='correo'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio',
                        pattern: { value: /^\S+@\S+$/i, message: 'El campo "correo electrónico" debe ser un correo electrónico válido' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Correo Electrónico'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='password' className='text-gray-700 font-bold text-lg'>Contraseña: </label>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        minLength: { value: 8, message: 'El campo "Contraseña" debe tener al menos 8 caracteres' },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            message: 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="password"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Contraseña'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='phone' className='text-gray-700 font-bold text-lg'>Teléfono: </label>
                <Controller
                    name='phone'
                    control={control}
                    defaultValue=''
                    rules={{ 
                        required: 'Campo Obligatorio', 
                        pattern: { value: /^[0-9]+$/, message: 'El campo "Teléfono" debe contener solo números' },
                        maxLength: { value: 10, message: 'El campo "Teléfono" no debe tener más de 10 dígitos' }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="tel"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Teléfono'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>
            <div className="flex justify-center">
                <input
                    type="submit"
                    className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg mt-6'
                    value='Registrar Administrador'
                />
            </div>
        </form>
    );
};
