import React from 'react';
import TablaViajesCompartidosPendientes from '../componets/TablaViajesC';

const ListarViajesC = () => {
    return (
        <div className="h-screen pt-40 flex items-start justify-center">
            <div className="max-w-9xl w-full mx-auto px-4">
                <h1 className='font-black text-6xl text-gray-500 mb-8'>Viajes compartidos pendientes</h1>
                <p className='mb-8'>Este módulo permite gestionar los viajes compartidos</p>
                <hr className='my-4' />
                <p className='mb-8'></p>
                <TablaViajesCompartidosPendientes />
            </div>
        </div>
    );
}

export default ListarViajesC;
