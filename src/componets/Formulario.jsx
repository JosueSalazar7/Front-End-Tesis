import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ conductor }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, reset } = useForm();
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        // Si se está actualizando un conductor, se resetea el formulario con los datos del conductor actual
        if (conductor) {
            reset({
                conductorNombre: conductor.conductorNombre,
                conductorApellido: conductor.conductorApellido,
                cedula: conductor.cedula,
                correo: conductor.correo,
                password: '', // Opcional: puede ser requerido o no dependiendo de tu lógica de negocio
                phone: conductor.phone,
                numeroAsientos: conductor.numeroAsientos,
                placaVehiculo: conductor.placaVehiculo,
                marcaVehiculo: conductor.marcaVehiculo,
                modeloVehiculo: conductor.modeloVehiculo,
                anioVehiculo: conductor.anioVehiculo,
                colorVehiculo: conductor.colorVehiculo
            });
        }
    }, [conductor, reset]);

    const onSubmit = async (data) => {
        try {
            if (conductor?._id) {
                // Actualizar el conductor
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarConductor/${conductor._id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, data, options);
            } else {
                // Registrar un nuevo conductor
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registrar-chofer`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post(url, data, options);
            }
            navigate('/dashboard/listar');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label htmlFor='conductorNombre' className='text-gray-700 uppercase font-bold text-sm'>Nombre del conductor: </label>
                <Controller
                    name='conductorNombre'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Nombre del conductor'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='conductorApellido' className='text-gray-700 uppercase font-bold text-sm'>Apellido del conductor: </label>
                <Controller
                    name='conductorApellido'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Apellido del conductor'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='cedula' className='text-gray-700 uppercase font-bold text-sm'>Cédula del conductor: </label>
                <Controller
                    name='cedula'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Cédula del conductor'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='correo' className='text-gray-700 uppercase font-bold text-sm'>Correo electrónico del conductor: </label>
                <Controller
                    name='correo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Correo electrónico del conductor'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
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
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="password"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Contraseña'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='phone' className='text-gray-700 uppercase font-bold text-sm'>Teléfono del conductor: </label>
                <Controller
                    name='phone'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Teléfono del conductor'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='numeroAsientos' className='text-gray-700 uppercase font-bold text-sm'>Número de asientos disponibles: </label>
                <Controller
                    name='numeroAsientos'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[1-4]$/,
                            message: 'El número de asientos debe ser un número entre 1 y 4'
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Número de asientos'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='placaVehiculo' className='text-gray-700 uppercase font-bold text-sm'>Placa del vehículo: </label>
                <Controller
                    name='placaVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Placa del vehículo'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='marcaVehiculo' className='text-gray-700 uppercase font-bold text-sm'>Marca del vehículo: </label>
                <Controller
                    name='marcaVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Marca del vehículo'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='modeloVehiculo' className='text-gray-700 uppercase font-bold text-sm'>Modelo del vehículo: </label>
                <Controller
                    name='modeloVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Modelo del vehículo'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='anioVehiculo' className='text-gray-700 uppercase font-bold text-sm'>Año del vehículo: </label>
                <Controller
                    name='anioVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Año del vehículo'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='colorVehiculo' className='text-gray-700 uppercase font-bold text-sm'>Color del vehículo: </label>
                <Controller
                    name='colorVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                placeholder='Color del vehículo'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
                value={conductor?._id ? 'Actualizar conductor' : 'Registrar conductor'}
            />
        </form>
    )
}
