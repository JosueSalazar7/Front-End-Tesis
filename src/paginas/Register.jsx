import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Mensaje from '../componets/Alertas/Mensaje';

export const Register = () => {
    const navigate = useNavigate();
    // Inicializa useForm para gestionar el formulario
    const {
        handleSubmit,
        control, // Controla los campos del formulario
        formState: { errors }, // Gestiona los errores
    } = useForm();

    const [form, setForm] = useState({
        adminNombre: '',
        adminApellido: '',
        correo: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [mensaje, setMensaje] = useState({});

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/register`;
            const respuesta = await axios.post(url, data);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setForm({});
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <>

            <div className="bg-white flex justify-center items-center w-1/2">
                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length > 0 && (
                        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
                        Bienvenido
                    </h1>
                    <small className="text-gray-400 block my-4 text-sm">
                        Porfavor, ingrese los datos
                    </small>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label
                                htmlFor="adminNombre"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Nombre:
                            </label>
                            <Controller
                                name="adminNombre"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Campo Obligatorio',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Solo se aceptan letras',
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            maxLength={20}
                                            className={`block w-full rounded-md border ${errors.adminNombre ? 'border-red-500' : 'border-gray-300'
                                                } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                            required
                                        />
                                        {errors.adminNombre && <p className="text-red-500 text-sm">{errors.adminNombre.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="adminApellido"
                            >
                                Apellido:
                            </label>
                            <Controller
                                name="adminApellido"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Obligatory field",
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Solo se acpetan letras',
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Ingrese su apellido"
                                            maxLength={20}
                                            className={`block w-full rounded-md border ${errors.adminApellido ? "border-red-500" : "border-gray-300"
                                                } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                            required
                                        />
                                        {errors.adminApellido && (
                                            <p className="text-red-500 text-sm">{errors.adminApellido.message}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="correo"
                            >
                                Email:
                            </label>
                            <Controller
                                name="correo"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Obligatory field",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "El correo no es valido",
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Ingrese su correo"
                                            maxLength={150}
                                            className={`block w-full rounded-md border ${errors.correo ? "border-red-500" : "border-gray-300"
                                                } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                            required
                                        />
                                        {errors.correo && (
                                            <p className="text-red-500 text-sm">{errors.correo.message}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="password"
                            >
                                Contraseña:
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Obligatory field",
                                    pattern: {
                                        value: 50,
                                        message: 'La contraseña es incorrecta ',
                                    },
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

                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="phone"
                            >
                                Telefono:
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Obligatory field",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Necesita tener 10 digitos',
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="text" 
                                            placeholder="Ingrese su telefono"
                                            className={`block w-full rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"
                                                } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="mb-3">
                            <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 "></div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya tienes una cuenta?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 "
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className="w-1/2 h-screen bg-[url('/public/images/carregister.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            "
            ></div>
        </>
    );
};