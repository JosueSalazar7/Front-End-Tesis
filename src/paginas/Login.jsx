import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, control, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, data);
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
              const errorMessage = error.response.data.msg;
              if (errorMessage === "Lo sentimos, debes llenar todos los campos") {
                setMensaje({ respuesta: errorMessage, tipo: false });
              } else if (errorMessage === "Lo sentimos, debe verificar su cuenta") {
                setMensaje({ respuesta: errorMessage, tipo: false });
              } else if (errorMessage === "Lo sentimos, el usuario no se encuentra regitrado") {
                setMensaje({ respuesta: errorMessage, tipo: false });
              } else if (errorMessage === "Lo sentimos, la contraseña no es la correcta") {
                setMensaje({ respuesta: errorMessage, tipo: false });
              } else {
                setMensaje({ respuesta: 'Error de conexión', tipo: false });
              }
            } else {
              setMensaje({ respuesta: 'Error de conexión', tipo: false });
            }
            setTimeout(() => {
              setMensaje({});
            }, 3000);
          }
        };
        const maxCardWidthStyle = {
            maxWidth: '900px',
            margin: '0 auto'
        };


        return (
            <div className="flex justify-center items-center h-screen">
                <img src="/images/login1.jpg" alt="Background" className="fixed top-0 left-0 w-full h-full object-cover z-0" />
                <div className="absolute inset-50 flex justify-center items-center z-20">
                <div style={{ ...maxCardWidthStyle, backgroundColor: '#47B7A1', opacity: 0.95 }} className="rounded-lg p-8">
                        {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        <h1 className="text-5xl font-semibold mb-2 text-center uppercase text-white">¡Bienvenido de nuevo!</h1>
                        <small className="text-white block my-4 text-lg">Por favor ingresa tus datos</small>

                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-500 mx-500">
                            <Controller
                                name="correo"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Debe llenar todos los campos',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Formato de correo electrónico inválido'
                                    }
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <label className="mb-2 block text-xl font-semibold text-white">Correo electrónico</label>
                                        <input
                                            {...field}
                                            type="email"
                                            placeholder="Introduce tu correo electrónico"
                                            maxLength={50}
                                            className={`block w-full rounded-md border ${errors.correo ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                        />
                                        {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
                                    </div>
                                )}
                            />
                            <div className="mb-3 relative">
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Debe llenar todos los campos',
                                        minLength: {
                                            value: 8,
                                            message: 'La contraseña debe contener al menos 8 caracteres y al menos un número y una letra, sin caracteres especiales'
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                            message: 'La contraseña debe contener al menos 8 caracteres y al menos un número y una letra, sin caracteres especiales'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <label className="mb-2 block text-xl font-semibold text-white">Contraseña</label>
                                            <input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="********************"
                                                className={`block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                            />
                                        </>
                                    )}
                                />
                                <button
                                    type="button"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                                </button>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <div className="my-4">
                                <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</button>
                            </div>
                        </form>

                        <div className="mt-5 text-xs border-b-2 py-4 ">
                            <Link to="/forgot/id" className="underline text-lg text-white hover:text-white-900">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default Login;
