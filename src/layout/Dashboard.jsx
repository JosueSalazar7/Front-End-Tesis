import { useState, useContext, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { auth } = useContext(AuthContext);
    const autenticado = localStorage.getItem('token');

    // Estado para controlar si los submenús están desplegados o no
    const [menuAbierto, setMenuAbierto] = useState(null);
    // Obtener el perfil del contexto o del estado local si lo tienes disponible
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/perfil`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                if (respuesta.data) {
                    setPerfil(respuesta.data);
                } else {
                    setError('No se recibió respuesta del servidor');
                }
            } catch (error) {
                setError('Error al obtener el perfil: ' + error.message);
            }
        };

        obtenerPerfil();
    }, []);

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/5 bg-gray-800 px-5 py-4'>
                <h2 className='text-3xl font-black text-center text-slate-200'>Fasty Cars Administrador</h2>
                <img src="https://static.vecteezy.com/system/resources/previews/011/171/301/non_2x/road-trip-vacation-by-car-on-mountain-highway-with-rocky-cliffs-view-concept-cartoon-illustration-vector.jpg" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
                <p className='text-slate-400 text-center my-4 text-sm'>
                    <span className='bg-green-600 mx-2 w-3 h-3 inline-block rounded-full'></span>Bienvenido - {auth?.nombre}</p>
                <hr className="mt-5 border-slate-500" />
                <ul className="mt-5">
                    <li className="text-center relative">
                        {/* Perfil - Menú desplegable */}
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'perfil' ? null : 'perfil')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual === '/dashboard' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Información del Perfil</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'perfil' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'perfil' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10 w-full">
                                <Link
                                    to='/dashboard'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Perfil
                                </Link>
                                {perfil !== null && (
                                    <Link
                                        to={`/dashboard/actualizarPerfil/${perfil._id}`}
                                        className="block text-slate-100 hover:text-slate-200"
                                    >
                                        Actualizar Perfil
                                    </Link>
                                )}

                                <Link
                                    to='/dashboard/actualizarContrasena'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Actualizar Contraseña
                                </Link>
                            </div>
                        )}

                    </li>
                    {/* Conductores - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'conductor' ? null : 'conductor')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual.includes('/dashboard/crear') || urlActual.includes('/dashboard/listar') ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Conductores</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'conductor' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'conductor' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/crear'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Registrar Conductor
                                </Link>
                                <Link
                                    to='/dashboard/listar'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Ver Conductores
                                </Link>
                            </div>
                        )}
                    </li>
                    {/* Rutas y horarios - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'ruta' ? null : 'ruta')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual.includes('/dashboard/registrar-ruta') || urlActual.includes('/dashboard/listar-rutas') ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Rutas y Horarios</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'ruta' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'ruta' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/registrar-ruta'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Registrar Ruta
                                </Link>
                                <Link
                                    to='/dashboard/listar-rutas'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Ver Rutas
                                </Link>
                            </div>
                        )}
                    </li>
                    {/* Viajes compartidos - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'viajesCompartidos' ? null : 'viajesCompartidos')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual.includes('/dashboard/listar-viajes-compartidos') ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Viajes Compartidos</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'viajesCompartidos' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'viajesCompartidos' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/listar-viajes-compartidos'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Ver Viajes Compartidos Pendientes
                                </Link>
                        
                            </div>
                        )}
                    </li>
                    {/* Viajes privados - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'viajesPrivados' ? null : 'viajesPrivados')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual.includes('/dashboard/listar-viajes-privados') ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Viajes Privados</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'viajesPrivados' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'viajesPrivados' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/listar-viajes-privados'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Ver Viajes Privados Pendientes
                                </Link>
                            </div>
                        )}
                    </li>
                    {/* Encomiendas - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'encomiendas' ? null : 'encomiendas')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual.includes('/dashboard/listar-encomiendas') ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Encomiendas</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'encomiendas' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'encomiendas' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/listar-encomiendas'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Ver Encomiendas Pendientes
                                </Link>
                            </div>
                        )}
                    </li>
                    {/* Pasajeros - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'pasajeros' ? null : 'pasajeros')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual.includes('/dashboard/listar-pasajeros') ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Pasajeros</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'pasajeros' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'pasajeros' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/listar-pasajeros'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Listar pasajeros
                                </Link>
                            </div>
                        )}
                    </li>
                    {/* Administrador - Menú desplegable */}
                    <li className="text-center relative">
                        <button
                            onClick={() => setMenuAbierto(menuAbierto === 'administrador' ? null : 'administrador')}
                            className={`text-xl flex items-center justify-between w-full mt-2 hover:text-slate-600 ${urlActual === '/dashboard/register' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md' : 'text-slate-600'}`}
                        >
                            <span>Administrador</span>
                            <span className="text-slate-100">
                                {menuAbierto === 'administrador' ? '▲' : '▼'}
                            </span>
                        </button>
                        {menuAbierto === 'administrador' && (
                            <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-md shadow-lg z-10" style={{ width: 'calc(100% + 10px)' }}>
                                <Link
                                    to='/dashboard/register'
                                    className="block text-slate-100 hover:text-slate-200"
                                >
                                    Registrar Administrador
                                </Link>
                            </div>
                        )}
                    </li>
                    {/* Resto de elementos de menú */}
                </ul>
            </div>
            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Bienvenido - {auth?.nombre}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg" onClick={() => { localStorage.removeItem('token') }}>Salir</Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
