import React from 'react'
import { FormularioRuta } from '../componets/FormularioRuta'
import { Link } from 'react-router-dom';


const RegistrarRuta = () => {
    return (
        <div className="relative">
            <Link to="/dashboard/listar-rutas" className="left-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
            </Link>
            <div className="h-screen pt-14 items-start text-center">
                <div>
                    <h1 className='font-black text-5xl text-gray-500'>Rutas</h1>
                    <hr className='my-4' />
                    <p className='mb-8'>Registrar una nueva ruta</p>
                    <FormularioRuta />
                </div>
            </div>
        </div>
    )
}

export default RegistrarRuta