import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import carro from '../assets/carro1.jpg';

const Restablecer = () => {
    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    });
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({});
    const [tokenback, setTokenBack] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/recuperar-password/${token}`;
            const respuesta = await axios.get(url);
            setTokenBack(true);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const errors = {};

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!form.password) {
            errors.password = 'Debe llenar todos los campos';
            valid = false;
        } else if (!passwordPattern.test(form.password)) {
            errors.password = 'La contraseña debe contener al menos 8 caracteres y al menos un número y una letra, sin caracteres especiales';
            valid = false;
        }

        if (!form.confirmpassword) {
            errors.confirmpassword = 'Debe llenar todos los campos';
            valid = false;
        } else if (!passwordPattern.test(form.confirmpassword)) {
            errors.confirmpassword = 'La contraseña debe contener al menos 8 caracteres y al menos un número y una letra, sin caracteres especiales';
            valid = false;
        } else if (form.password !== form.confirmpassword) {
            errors.confirmpassword = 'Las contraseñas no coinciden';
            valid = false;
        }

        setErrors(errors);

        if (!valid) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/nuevo-password/${token}`;
            const respuesta = await axios.post(url, form);
            setForm({ password: "", confirmpassword: "" });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido de nuevo</h1>
            <small className="text-gray-400 block my-4 text-sm">Por favor ingrese sus datos</small>
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={carro} alt="image description" />
            {tokenback &&
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingrese la contraseña"
                                className={`block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                                value={form.password || ""}
                                name='password'
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <HiEyeOff className="text-black-500" /> : <HiEye className="text-black-500" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        
                        <label className="mb-2 block text-sm font-semibold">Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder="Repita la contraseña"
                            className={`block w-full rounded-md border ${errors.confirmpassword ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                            value={form.confirmpassword || ""}
                            name='confirmpassword'
                            onChange={handleChange}
                        />
                        {errors.confirmpassword && <p className="text-red-500 text-sm">{errors.confirmpassword}</p>}
                    </div>
                    <div className="mb-3">
                        <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Enviar</button>
                    </div>
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>Una vez validado ya puedes iniciar sesión</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </form>
            }
        </div>
    );
};

export default Restablecer;
