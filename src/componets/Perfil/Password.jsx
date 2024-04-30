import React, { useState } from "react";
import Mensaje from "../Alertas/Mensaje";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Password = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    passwordactual: "",
    passwordnuevo: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizarpassword`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Aquí puedes incluir cualquier token de autenticación necesario
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setMensaje({
          respuesta: "Contraseña actualizada correctamente",
          tipo: true,
        });
      } else {
        const errorData = await response.json();
        setMensaje({
          respuesta: errorData.message || "Hubo un error al actualizar la contraseña",
          tipo: false,
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setMensaje({
        respuesta: "Hubo un error al actualizar la contraseña",
        tipo: false,
      });
    }
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="font-black text-4xl text-gray-500">Contraseña</h1>
        <hr className="my-4" />
        <p className="mb-2">Actualizar contraseña</p>
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <div>
          <label htmlFor="passwordactual" className="text-gray-700 uppercase font-bold text-sm">
            Contraseña Actual:
          </label>
          <div className="relative">
            <input
              id="passwordactual"
              type={showPassword ? "text" : "password"}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
              placeholder="**************"
              name="passwordactual"
              value={form.passwordactual}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="passwordnuevo" className="text-gray-700 uppercase font-bold text-sm">
            Nueva Contraseña:
          </label>
          <input
            id="passwordnuevo"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
            placeholder="**************"
            name="passwordnuevo"
            value={form.passwordnuevo}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all"
          value="Actualizar"
        />
      </form>
    </>
  );
};

export default Password;
