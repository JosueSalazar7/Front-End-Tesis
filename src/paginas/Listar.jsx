import React from 'react';
import Tabla from '../componets/Tabla';

const Listar = () => {
    return (
        <div className="h-screen pt-24 flex items-start justify-center">
            <div className="max-w-9xl w-full mx-auto px-4">
                <h1 className='font-black text-7xl text-gray-500 text-center mb-8'>Conductores</h1>
                <p className='mb-8 text-center'>Este módulo permite gestionar los conductores</p>
                <hr className='my-4' />
                <p className='mb-8'></p>
                <Tabla />
            </div>
        </div>
    );
}

export default Listar;
