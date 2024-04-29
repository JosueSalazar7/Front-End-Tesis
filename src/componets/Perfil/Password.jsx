import Mensaje from "../Alertas/Mensaje"
import { useState } from "react"
import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"

const Password = () => {
    const [mensaje, setMensaje] = useState({})
    const [form, setForm] = useState({
        passwordactual: "",
        passwordnuevo: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_UPDATE_PASSWORD_URL}/admin/actulizarpassword`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Aquí puedes incluir cualquier token de autenticación necesario
                },
                body: JSON.stringify(form)
            });
            if (response.ok) {
                setMensaje({ respuesta: "Contraseña actualizada correctamente", tipo: true });
            } else {
                const errorData = await response.json();
                setMensaje({ respuesta: errorData.message || "Hubo un error al actualizar la contraseña", tipo: false });
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setMensaje({ respuesta: "Hubo un error al actualizar la contraseña", tipo: false });
        }
    };

    return (
        <>
            <div className='mt-5'>
                <h1 className='font-black text-4xl text-gray-500'>Contraseña</h1>
                <hr className='my-4' />
                <p className='mb-2'>Acutalizar contraseña</p>
            </div>
            <form onSubmit={handleSubmit}>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <div>
                    <label
                        htmlFor='passwordactual'
                        className='text-gray-700 uppercase font-bold text-sm'>Contraseña Actual:</label>
                    <input
                        id='passwordactual'
                        type="password"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='**************'
                        name='passwordactual'
                        value={form.passwordactual}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor='passwordnuevo'
                        className='text-gray-700 uppercase font-bold text-sm'>Nueva Contraseña: </label>
                    <input
                        id='passwordnuevo'
                        type="password"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='**************'
                        name='passwordnuevo'
                        value={form.passwordnuevo}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                    value='Actualizar' />
            </form>
        </>
    )
}

export default Password