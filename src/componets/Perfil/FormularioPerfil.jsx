import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import Mensaje from "../Alertas/Mensaje"
import { useForm, Controller } from "react-hook-form";


const FormularioPerfil = () => {
    const [mensaje, setMensaje] = useState({})
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            id: auth._id,
            nombre: auth.adminNombre || "",
            apellido: auth.adminApellido || "",
            telefono: auth.phone || "",
            email: auth.correo || ""
        }
    });

    const onSubmit = async (data) => {
        if (Object.values(data).includes("")) {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        const resultado = await actualizarPerfil(data);
        setMensaje(resultado);
        setTimeout(() => {
            setMensaje({});
        }, 3000);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            <div>
                <label
                    htmlFor="adminNombre"
                    className="text-gray-700 uppercase font-bold text-sm"
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
                            message: 'Solo se acpetan letras',
                        },
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="text"
                                placeholder="Ingrese su nombre"
                                maxLength={20}
                                className={`block w-full rounded-md border ${errors.adminNombreombre ? 'border-red-500' : 'border-gray-300'
                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                required
                            />
                            {errors.adminNombre && <p className="text-red-500 text-sm">{errors.adminNombre.message}</p>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor="adminApellido"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Apellido:
                </label>
                <Controller
                    name="adminApellido"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Campo Obligatorio",
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
                                placeholder="Enter your last name"
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

            <div>
                <label
                    htmlFor="phone"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Celular:
                </label>
                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Campo Obligatorio",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'El celular debe tener 10 digitos',
                        },
                    }}
                    render={({ field }) => (
                        <div className="mb-3">
                            <input
                                {...field}
                                type="text"
                                placeholder="Enter your phone"
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



            <input
                type="submit"
                className="bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                value="Actualizar"
            />
        </form>
    );
};

export default FormularioPerfil;