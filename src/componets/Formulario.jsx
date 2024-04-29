import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ conductor }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();
    const [mensaje, setMensaje] = useState({});

    const onSubmit = async (data) => {
        try {
            if (conductor?._id) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarConductor/${conductor?._id}`;
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, data, options);
                navigate('/dashboard/listar');
            } else {
                const token = localStorage.getItem('token');
                data.id = auth._id;
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registrar-chofer`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post(url, data, options);
                navigate('/dashboard/listar');
            }
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
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del conductor: </label>
                <Controller
                    name='ConductorNombre'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Solo se aceptan letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Nombre del conductor'
                                maxLength={20}
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
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del conductor: </label>
                <Controller
                    name='conductorApellido'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Solo se aceptan letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Apellido del conductor'
                                maxLength={20}
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
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Correo: </label>
                <Controller
                    name='correo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'el correo no es valido',
                        },

                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Correo'
                                maxLength={60}
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
                    htmlFor='contraseña:'
                    className='text-gray-700 uppercase font-bold text-sm'>Contraseña: </label>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: 50,
                            message: 'La contraseña es incorrecta ',
                        }
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="password"
                                placeholder="********************"
                                className={`block w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <Controller
                    name='phone'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'El celular debe tener 10 digitos',
                        },
                        maxLength: {
                            value: 10,
                            message: 'El celular debe tener máximo 10 dígitos',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Celular'
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
                    htmlFor='cedula:'
                    className='text-gray-700 uppercase font-bold text-sm'>Cédula: </label>
                <Controller
                    name='cedula'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'La cédula debe tener 10 digitos',
                        },
                        maxLength: {
                            value: 10,
                            message: 'La cédula debe tener máximo 10 dígitos',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Cédula'
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
                    htmlFor='asientos:'
                    className='text-gray-700 uppercase font-bold text-sm'>Numero de asientos del vehiculo: </label>
                <Controller
                    name='numeroAsientos'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[1-4]*$/,
                            message: 'El vehiculo solo puede tener de 1 a 4 asientos disponibles',
                        },
                        maxLength: {
                            value: 1,
                            message: 'Para el número de asientos solo se puede ingresar un digito',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Numero de asientos'
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
                    htmlFor='placa:'
                    className='text-gray-700 uppercase font-bold text-sm'>Placa del vehiculo: </label>
                <Controller
                    name='placaVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z0-9]*$/,
                            message: 'La placa debe contener solo letras y números',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Placa'
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
                    htmlFor='marca:'
                    className='text-gray-700 uppercase font-bold text-sm'>Marca del vehiculo: </label>
                <Controller
                    name='marcaVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Solo se aceptan letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Marca'
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
                    htmlFor='modelo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Modelo del vehiculo: </label>
                <Controller
                    name='modeloVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Solo se aceptan letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Modelo'
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
                    htmlFor='año:'
                    className='text-gray-700 uppercase font-bold text-sm'>Año del vehiculo: </label>
                <Controller
                    name='anioVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'El año solo puede tener 4 digitos',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="number"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Año'
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
                    htmlFor='color:'
                    className='text-gray-700 uppercase font-bold text-sm'>Color del vehiculo: </label>
                <Controller
                    name='colorVehiculo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo Obligatorio',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Solo se aceptan letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Color'
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
