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
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label htmlFor='adminNombre' className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <Controller
                    name='adminNombre'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Nombre'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='adminApellido' className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <Controller
                    name='adminApellido'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Apellido'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='correo' className='text-gray-700 uppercase font-bold text-sm'>Correo Electrónico: </label>
                <Controller
                    name='correo'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Correo Electrónico'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='password' className='text-gray-700 uppercase font-bold text-sm'>Contraseña: </label>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="password"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Contraseña'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='phone' className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <Controller
                    name='phone'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Campo Obligatorio' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="tel"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Teléfono'
                            />
                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
                value='Registrar Administrador'
            />
        </form>
    );
};
