import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth, setEstado } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, data);
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            navigate('/dashboard');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <>
            <div className="w-1/2 h-screen bg-[url('/public/images/carlogin.jpg')] bg-no-repeat bg-cover bg-center sm:block hidden"></div>

            <div className="w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">¡Bienvenido de nuevo!</h1>
                    <small className="text-gray-400 block my-4 text-sm">Por favor ingresa tus datos</small>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="correo"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Formato de correo electrónico inválido'
                                }
                            }}
                            render={({ field }) => (
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="Introduce tu correo electrónico"
                                        maxLength={122}
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
                                rules={{ required: 'Este campo es obligatorio' }}
                                render={({ field }) => (
                                    <>
                                        <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                                        <input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'} // Mostrar contraseña según el estado de showPassword
                                            placeholder="********************"
                                            className={`block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                        />
                                    </>
                                )}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)} // Alternar el estado de mostrar contraseña
                            >
                                {showPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">iniciar sesión</button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿No tienes una cuenta?</p>
                        <Link to="/register" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrate</Link>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Login;
