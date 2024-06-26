import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import React from 'react';

export const Forgot = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mensaje, setMensaje] = useState({});

  const onSubmit = async (data) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/recuperar-password`;
      const respuesta = await axios.post(url, data);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
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
            ¡Olvidaste tu contraseña!
          </h1>
          <small className="text-gray-400 block my-4 text-sm">
            No te preocupes, por favor ingresa tus datos
          </small>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <label className="mb-2 block text-sm font-semibold">
                Correo electrónico
              </label>
              <Controller
                name="correo"
                control={control}
                defaultValue=""
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Formato de correo electrónico inválido",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Introduce tu correo electrónico"
                    maxLength={122}
                    className={`block w-full rounded-md border ${
                      errors.correo ? "border-red-500" : "border-gray-300"
                    } focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                  />
                )}
              />
              {errors.correo && (
                <p className="text-red-500 text-sm">{errors.correo.message}</p>
              )}
            </div>

            <div className="mb-3">
              <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                Enviar correo electrónico
              </button>
            </div>
          </form>

          <div className="mt-5 text-xs border-b-2 py-4 "></div>

          <div className="mt-3 text-sm flex justify-between items-center">
            <p>Ya te acordaste?</p>
            <Link
              to="/login"
              className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
            >
              iniciar sesión
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-1/2 h-screen bg-[url('/public/images/fast.jpg')] 
        bg-no-repeat bg-cover bg-center sm:block hidden
        "
      ></div>
    </>
  );
};

