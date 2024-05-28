// src/LandingPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import carro from '../assets/carro.avif';
import appVideo from '../assets/App.mp4';
import googlePlay from '../assets/google-play.png';
import viajeprivado from '../assets/viaje privado.avif';
import encomienda from '../assets/encomienda.jpeg';
import viajecompartido from '../assets/viaje compartido.jpg';

export const LandinPage = () => {
    const [darkMode, setDarkMode] = useState(true); // Dark mode por defecto

    return (
        <div className={darkMode ? 'dark' : ''}>
            <main className='bg-white dark:bg-gray-900 px-0 md:px-20 lg:px-40'>
                <nav className='p-10 mb-12 flex justify-between bg-gray-800'>
                    <h1 className='text-4xl font-bold text-white'>FastyCars SA</h1>
                    <ul className='flex items-center'>
                        <li><a href="#inicio" className='text-white text-lg px-4 hover:text-gray-400'>Inicio</a></li>
                        <li><a href="#servicios" className='text-white text-lg px-4 hover:text-gray-400'>Nuestros Servicios</a></li>
                        <li><a href="#sobrenosotros" className='text-white text-lg px-4 hover:text-gray-400'>Sobre Nosotros</a></li>
                        <li><a href="#appmovil" className='text-white text-lg px-4 hover:text-gray-400'>App Móvil</a></li>
                        <li>
                            <Link to="/login" className='bg-blue-500 text-white text-lg px-8 py-3 rounded-full ml-8 hover:bg-blue-600'>
                                Iniciar sesión
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Sección Principal */}
                <div id="inicio" className='flex flex-wrap items-center mb-20'>
                    <div className='w-full md:w-1/2 px-6 mb-12 md:mb-0'>
                        <h2 className='text-6xl py-2 text-teal-600 font-medium md:text-7xl text-center'>Empresa de viajes</h2>
                        <h3 className='text-3xl py-2 md:text-4xl dark:text-white text-center'>ADMINISTRADOR</h3>
                    </div>
                    <div className='w-full md:w-1/2 px-6'>
                        <div className='relative mx-auto bg-gradient-to-b from-indigo-400 w-full h-full overflow-hidden md:w-full md:h-full dark:border-4 border-teal-300'>
                            <img src={carro} alt="carro" className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>

                {/* Sección Servicios */}
                <section id="servicios" className='text-center mb-20'>
                    <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Nuestros Servicios</h2>
                    <div className='flex flex-wrap justify-center mt-12'>
                        <div className='w-full md:w-1/3 px-6 mb-8'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-8 rounded-lg'>
                                <h3 className='text-2xl font-semibold mb-4 dark:text-white'>Viajes Compartidos</h3>
                                <img src={viajecompartido} alt="Viajes Compartidos" className='w-full h-60 object-cover mb-4' />
                                <p className='text-gray-600 dark:text-gray-300'>Reserva tu viaje y viaja con más usuarios.</p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/3 px-6 mb-8'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-8 rounded-lg'>
                                <h3 className='text-2xl font-semibold mb-4 dark:text-white'>Viajes Privados</h3>
                                <img src={viajeprivado} alt="Viajes Privados" className='w-full h-60 object-cover mb-4' />
                                <p className='text-gray-600 dark:text-gray-300'>Reserva tu viaje y viaja completamente solo.</p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/3 px-6 mb-8'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-8 rounded-lg'>
                                <h3 className='text-2xl font-semibold mb-4 dark:text-white'>Encomiendas</h3>
                                <img src={encomienda} alt="Envío de Encomiendas" className='w-full h-60 object-cover mb-4' />
                                <p className='text-gray-600 dark:text-gray-300'>Reserva para enviar tu paquete.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección Sobre Nosotros */}
                <section id="sobrenosotros" className='text-center mb-20'>
                    <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Sobre Nosotros</h2>
                    <div className='flex flex-wrap justify-center mt-12'>
                        <div className='w-full md:w-1/2 px-6 mb-8'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-8 rounded-lg'>
                                <h2 className='text-3xl font-semibold mb-4 dark:text-white'>Misión</h2>
                                <p className='text-gray-600 dark:text-gray-300 text-xl'>
                                    En FastyCars, nos comprometemos a proporcionar un servicio de transporte puerta a puerta seguro, confiable y puntual para nuestros clientes en la ruta de Quito - Tena. Con más de cinco años de experiencia en el mercado, nos esforzamos por ofrecer soluciones innovadoras y tecnológicas que mejoren la experiencia del usuario y garanticen la integridad de nuestros servicios. Nos dedicamos a satisfacer las necesidades de transporte de nuestros clientes mientras mantenemos altos estándares de calidad, seguridad y eficiencia en todas nuestras operaciones.
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 px-6 mb-8'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-8 rounded-lg'>
                                <h2 className='text-3xl font-semibold mb-4 dark:text-white'>Visión</h2>
                                <p className='text-gray-600 dark:text-gray-300 text-xl'>
                                    Nos visualizamos como líderes en el sector del transporte, reconocidos por nuestra excelencia en servicio al cliente, innovación tecnológica y compromiso con la seguridad. Buscamos transformar la industria del transporte privado en Ecuador, ofreciendo soluciones integradas y eficientes que mejoren la calidad de vida de nuestros usuarios y contribuyan al desarrollo sostenible de nuestras comunidades. Nuestro objetivo es establecer una reputación de confiabilidad y profesionalismo, siendo la primera opción para aquellos que buscan un transporte seguro, cómodo y moderno en todo momento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección App Móvil */}
                <section id="appmovil" className='text-center mb-20'>
                    <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>App Móvil</h2>
                    <div className='flex flex-wrap justify-center mt-12'>
                        <div className='w-full md:w-1/4 px-8 mb-8'>
                            <video controls className='w-full h-auto rounded-lg'>
                                <source src={appVideo} type="video/mp4" />
                                Tu navegador no soporta la reproducción de videos.
                            </video>
                        </div>
                        <div className='w-full md:w-1/2 px-10 mb-12 flex items-center justify-center'>
                            <a href='https://play.google.com/store/apps/details?id=com.marlon1925.FastyCarsDemo' target='_blank' rel='noopener noreferrer'>
                                <img src={googlePlay} alt="Descargar en Google Play" className='w-60 h-auto' />
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
