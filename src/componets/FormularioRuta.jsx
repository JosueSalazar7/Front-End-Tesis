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
        // Si se está actualizando una ruta, se resetea el formulario con los datos de la ruta actual
        if (ruta) {
            reset({
                nombre: ruta.ruta.nombre,
                ciudad1: ruta.ruta.ciudad1,
                ciudad2: ruta.ruta.ciudad2,
                horario1: ruta.horario?.horario1, // Modificación aquí
                horario2: ruta.horario?.horario2, // Modificación aquí
                horario3: ruta.horario?.horario3, // Modificación aquí
            });
        }
    }, [ruta, reset]);

    const onSubmit = async (data) => {
        try {
            if (ruta?._id) {
                // Actualizar la ruta
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarRuta/${ruta._id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, data, options);
            } else {
                // Registrar una nueva ruta
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registro-ruta`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
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
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la ruta: </label>
                <Controller
                    name='nombre'
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
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Nombre de la ruta'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='ciudad1'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad de origen: </label>
                <Controller
                    name='ciudad1'
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
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Ciudad de origen'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='ciudad2'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad de destino: </label>
                <Controller
                    name='ciudad2'
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
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Ciudad de destino'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='horario1'
                    className='text-gray-700 uppercase font-bold text-sm'>Horario 1: </label>
                <Controller
                    name='horario1'
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
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Horario 1'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='horario2'
                    className='text-gray-700 uppercase font-bold text-sm'>Horario 2: </label>
                <Controller
                    name='horario2'
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
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Horario 2'
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='horario3'
                    className='text-gray-700 uppercase font-bold text-sm'>Horario 3: </label>
                <Controller
                    name='horario3'
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
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Horario 3'
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
                className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg mt-3'
                value={ruta?._id ? 'Actualizar ruta' : 'Registrar ruta'}
            />
        </form>
    )
}
