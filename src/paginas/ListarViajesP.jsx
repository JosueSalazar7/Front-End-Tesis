import React from 'react';
import TablaViajesPrivadosPendientes from '../componets/TablaViajesP';

const ListarViajesP = () => {
    return (
        <div className="h-screen pt-48 flex items-start justify-center">
            <div className="max-w-9xl w-full mx-auto px-4">
                <h1 className='font-black text-6xl text-gray-500 mb-8'>Viajes privados pendientes</h1>
                <p className='mb-8'>Este módulo permite gestionar los viajes privadoss</p>
                <hr className='my-4' />
                <p className='mb-8'></p>
                <TablaViajesPrivadosPendientes />
            </div>
        </div>
    );
}

export default ListarViajesP;
