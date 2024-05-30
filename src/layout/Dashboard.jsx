import React, { useState, useContext, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import  AuthContext  from '../context/AuthProvider'; // Cambio aquí
import axios from 'axios';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    TicketIcon,
    InboxIcon,
    MapIcon,
    TruckIcon,
    UsersIcon,
    UserPlusIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { auth, setAuth } = useContext(AuthContext);
    const autenticado = localStorage.getItem('token');

    const [menuAbierto, setMenuAbierto] = useState(null);
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
                    localStorage.setItem('nombre', respuesta.data.nombre);
                    setAuth(prevAuth => ({ ...prevAuth, nombre: respuesta.data.nombre }));
                } else {
                    setError('No se recibió respuesta del servidor');
                }
            } catch (error) {
                setError('Error al obtener el perfil: ' + error.message);
            }
        };

        obtenerPerfil();
    }, []);
    useEffect(() => {
        const nombre = localStorage.getItem('nombre');
        if (nombre) {
            setAuth(prevAuth => ({ ...prevAuth, nombre }));
        }
    }, []);

    const handleOpen = (value) => {
        setMenuAbierto(menuAbierto === value ? null : value);
    };

    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/5 bg-gray-800 px-5 py-4 mb-[-0px]">
                <Card className=" bg-gray-800">
                    <div className="text-3xl font-black text-center text-slate-200">
                        Fasty Cars Administrador
                    </div>
                    <img src="https://static.vecteezy.com/system/resources/previews/011/171/301/non_2x/road-trip-vacation-by-car-on-mountain-highway-with-rocky-cliffs-view-concept-cartoon-illustration-vector.jpg" alt="img-client" className="m-auto mt-5 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
                    <p className="text-white text-center my-3 text-sm">
                        <span className="bg-green-600 mx-2 w-3 h-3 inline-block rounded-full"></span>
                        Bienvenido - {auth?.adminNombre}
                    </p>
                    <hr className="" />
                    <List className="mt-0">
                        <Accordion
                            open={menuAbierto === 'perfil'}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'perfil' ? 'rotate-180' : ''}`}
                                />
                            }
                        >
                            <ListItem className="p-0">
                                <AccordionHeader onClick={() => handleOpen('perfil')} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="white" className="mr-auto font-normal">
                                        Información del Perfil
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        <Link to='/dashboard' className="block text-slate-100 hover:text-slate-200">
                                            Perfil
                                        </Link>
                                    </ListItem>
                                    {perfil !== null && (
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to={`/dashboard/actualizarPerfil/${perfil._id}`} className="block text-slate-100 hover:text-slate-200">
                                                Actualizar Perfil
                                            </Link>
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        <Link to='/dashboard/actualizarContrasena' className="block text-slate-100 hover:text-slate-200">
                                            Actualizar Contraseña
                                        </Link>
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'conductor'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'conductor' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('conductor')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <TruckIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Conductores
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/crear' className="block text-slate-100 hover:text-slate-200">
                                                Registrar Conductor
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/listar' className="block text-slate-100 hover:text-slate-200">
                                                Ver Conductores
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>
                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'ruta'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'ruta' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('ruta')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <MapPinIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Rutas y Horarios
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/registrar-ruta' className="block text-slate-100 hover:text-slate-200">
                                                Registrar Ruta
                                            </Link>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/listar-rutas' className="block text-slate-100 hover:text-slate-200">
                                                Ver Rutas
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>

                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'viajesCompartidos'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'viajesCompartidos' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('viajesCompartidos')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <TicketIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Viajes Compartidos
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/listar-viajes-compartidos' className="block text-slate-100 hover:text-slate-200">
                                                Ver Viajes Compartidos Pendientes
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>

                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'viajesPrivados'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'viajesPrivados' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('viajesPrivados')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <TicketIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Viajes Privados
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/listar-viajes-privados' className="block text-slate-100 hover:text-slate-200">
                                                Ver Viajes Privados Pendientes
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>

                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'encomiendas'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'encomiendas' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('encomiendas')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <InboxIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Encomiendas
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/listar-encomiendas' className="block text-slate-100 hover:text-slate-200">
                                                Ver Encomiendas Pendientes
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>

                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'pasajeros'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'pasajeros' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('pasajeros')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <UsersIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Pasajeros
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/listar-pasajeros' className="block text-slate-100 hover:text-slate-200">
                                                Listar pasajeros
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>

                        <ListItem>
                            <Accordion
                                open={menuAbierto === 'administrador'}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${menuAbierto === 'administrador' ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                <ListItem className="p-0">
                                    <AccordionHeader onClick={() => handleOpen('administrador')} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <UserPlusIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="white" className="mr-auto font-normal">
                                            Administrador
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Link to='/dashboard/register' className="block text-slate-100 hover:text-slate-200">
                                                Registrar Administrador
                                            </Link>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        </ListItem>
                        <div>
                            <Link to='/' className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg" onClick={() => { localStorage.removeItem('token') }}>Salir</Link>
                        </div>
                    </List>
                </Card>
            </div>
            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    {/* Contenido superior (puede ir aquí si lo deseas) */}
                </div>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
