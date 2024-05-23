import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ conductor }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, reset, trigger, formState: { errors } } = useForm();
    const [mensaje, setMensaje] = useState({});
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (conductor) {
            reset({
                conductorNombre: conductor.conductorNombre,
                conductorApellido: conductor.conductorApellido,
                cedula: conductor.cedula,
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
            console.log(data);
            const token = localStorage.getItem('token');
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            if (conductor?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarConductor/${conductor._id}`;
                await axios.put(url, data, options);
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registrar-chofer`;
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

    const nextStep = async () => {
        const valid = await trigger();
        if (valid) {
            setStep(step + 1);
        } else {
            setMensaje({ respuesta: 'Debe llenar todos los campos', tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}className="w-full max-w-lg mx-auto">

            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            {step === 1 && (
                <div>
                    <div>
                        <label htmlFor='conductorNombre' className='text-gray-700 font-bold text-lg'>Nombre del conductor: </label>
                        <Controller
                            name='conductorNombre'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Nombre del conductor'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor='conductorApellido' className='text-gray-700 font-bold text-lg'>Apellido del conductor: </label>
                        <Controller
                            name='conductorApellido'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Apellido del conductor'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm ">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor='cedula' className='text-gray-700 font-bold text-lg'>Cédula del conductor: </label>
                        <Controller
                            name='cedula'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: 'Campo Obligatorio',
                                minLength: {
                                    value: 10,
                                    message: 'La cédula debe tener 10 dígitos'
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'La cédula debe tener 10 dígitos'
                                }
                            }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Cédula del conductor'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg'
                            onClick={nextStep}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    {!conductor?._id && (
                        <>
                            <div>
                                <label htmlFor='correo' className='text-gray-700 font-bold text-lg'>Correo electrónico del conductor: </label>
                                <Controller
                                    name='correo'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Campo Obligatorio',
                                        maxLength: {
                                            value: 30,
                                            message: 'El correo electrónico debe tener máximo 30 caracteres'
                                        },
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Ingrese un correo electrónico válido'
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <input
                                                {...field}
                                                type="email"
                                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                                placeholder='Correo electrónico del conductor'
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
                                        minLength: {
                                            value: 6,
                                            message: 'La contraseña debe tener al menos 6 caracteres'
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                                            message: 'La contraseña debe contener al menos una letra y un número'
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <input
                                                {...field}
                                                type="password"
                                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                                placeholder='Contraseña'
                                            />
                                            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                        </div>
                                    )}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label htmlFor='phone' className='text-gray-700 font-bold text-lg'>Teléfono del conductor: </label>
                        <Controller
                            name='phone'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: 'Campo Obligatorio',
                                minLength: {
                                    value: 10,
                                    message: 'El número de celular debe tener 10 dígitos'
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'El número de celular debe tener 10 dígitos'
                                }
                            }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Teléfono del conductor'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg mr-3'
                            onClick={prevStep}
                        >
                            Anterior
                        </button>
                        <button
                            type="button"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg'
                            onClick={nextStep}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <div>
                        <label htmlFor='numeroAsientos' className='text-gray-700 font-bold text-lg'>Número de asientos disponibles: </label>
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
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Número de asientos'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor='placaVehiculo' className='text-gray-700 font-bold text-lg'>Placa del vehículo: </label>
                        <Controller
                            name='placaVehiculo'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Placa del vehículo'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor='marcaVehiculo' className='text-gray-700 font-bold text-lg'>Marca del vehículo: </label>
                        <Controller
                            name='marcaVehiculo'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Marca del vehículo'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg mr-3'
                            onClick={prevStep}
                        >
                            Anterior
                        </button>
                        <button
                            type="button"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg'
                            onClick={nextStep}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    <div>
                        <label htmlFor='modeloVehiculo' className='text-gray-700 font-bold text-lg'>Modelo del vehículo: </label>
                        <Controller
                            name='modeloVehiculo'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Modelo del vehículo'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor='anioVehiculo' className='text-gray-700 font-bold text-lg'>Año del vehículo: </label>
                        <Controller
                            name='anioVehiculo'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="number"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Año del vehículo'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor='colorVehiculo' className='text-gray-700 font-bold text-lg'>Color del vehículo: </label>
                        <Controller
                            name='colorVehiculo'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Campo Obligatorio' }}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="text"
                                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-1 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        placeholder='Color del vehículo'
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg mt-6 mr-3'
                            onClick={prevStep}
                        >
                            Anterior
                        </button>
                        <input
                            type="submit"
                            className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg mt-6'
                            value={conductor?._id ? 'Actualizar conductor' : 'Registrar conductor'}
                        />
                    </div>
                </div>
            )}
        </form>
    );
};
