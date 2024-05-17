import React from 'react';
import TablaViajesCompartidosPendientes from '../componets/TablaViajesC';

const ListarViajesC = () => {
    return (
        <div className="h-screen pt-48 flex items-start justify-center">
            <div className="max-w-9xl w-full mx-auto px-4">
                <h1 className='font-black text-7xl text-gray-500 text-center mb-8'>Viajes compartidos pendientes</h1>
                <hr className='my-4' />
                <p className='mb-8'></p>
                <TablaViajesCompartidosPendientes />
            </div>
        </div>
    );
}

export default ListarViajesC;
