import logoDarkMode from '../assets/dark.png';
import carro from "../assets/carro.avif";
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LandinPage = () => {
    const [darkMode, setDarkMode] = useState(true); // Cambiado a true para modo oscuro por defecto
    return (
        <div className={darkMode ? "dark" : ""}>
            <main className='bg-white px-0 md:px-20 lg:px-40'>
                <>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-4xl font-bold dark:text-dark'>FastyCars SA</h1>
                        <ul className='flex items-center'>
                            <li><Link to="/login" className='bg-black text-white text-lg px-8 py-3 rounded-full ml-8 hover:bg-gray-900 hover:text-white'>Iniciar sesión</Link></li>
                        </ul>
                    </nav>

                    <div className='flex'>
                        <div className='w-1/3'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6'>
                                <h2 className='text-xl font-semibold mb-4 dark:text-white'>Misión</h2>
                                <p className='text-gray-600 dark:text-gray-300'>En FastyCars, nos comprometemos a proporcionar un servicio de transporte puerta a puerta seguro, confiable y puntual para nuestros clientes en la ruta de Quito - Tena. Con más de cinco años de experiencia en el mercado, nos esforzamos por ofrecer soluciones innovadoras y tecnológicas que mejoren la experiencia del usuario y garanticen la integridad de nuestros servicios. Nos dedicamos a satisfacer las necesidades de transporte de nuestros clientes mientras mantenemos altos estándares de calidad, seguridad y eficiencia en todas nuestras operaciones.</p>
                            </div>
                            <div className='bg-gray-100 dark:bg-gray-700 p-6 rounded-lg'>
                                <h2 className='text-xl font-semibold mb-4 dark:text-white'>Visión</h2>
                                <p className='text-gray-600 dark:text-gray-300'>Nos visualizamos como líderes en el sector del transporte, reconocidos por nuestra excelencia en servicio al cliente, innovación tecnológica y compromiso con la seguridad. Buscamos transformar la industria del transporte privado en Ecuador, ofreciendo soluciones integradas y eficientes que mejoren la calidad de vida de nuestros usuarios y contribuyan al desarrollo sostenible de nuestras comunidades. Nuestro objetivo es establecer una reputación de confiabilidad y profesionalismo, siendo la primera opción para aquellos que buscan un transporte seguro, cómodo y moderno en todo momento.</p>
                            </div>
                        </div>
                        <div className='w-2/5'>
                            <div className='text-center'>
                                <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Empresa de viajes</h2>
                                <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>ADMINISTRADOR</h3>
                            </div>
                            <div className='relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-96 h-96 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <img src={carro} alt="carro" className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </main>
        </div>
    );
};
