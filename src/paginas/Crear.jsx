import React from 'react'
import { Formulario } from '../componets/Formulario'
import { Link } from 'react-router-dom';

const Crear = () => {
    return (
            <div className="relative">
                <Link to="/dashboard/listar" className="left-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver
                </Link>
                <div className="h-screen pt-32 justify-center">
                <div>
                    <h1 className='font-black text-6xl text-gray-500'>Conductores</h1>
                    <hr className='my-4' />
                    <p className='mb-8 '>Este modulo permite registrar un nuevo conductor</p>
                    <Formulario />
                </div>
            </div>
        </div>
    )
}

export default Crear
