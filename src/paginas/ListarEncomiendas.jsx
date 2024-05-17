import React from 'react';
import TablaEncomiendasPendientes from '../componets/TablaEncomiendas';

const ListarEncomiendas = () => {
    return (
        <div className="h-screen pt-48 flex items-start justify-center">
            <div className="max-w-9xl w-full mx-auto px-4">
                <h1 className='font-black text-7xl text-gray-500 text-center mb-8'>Encomiendas pendientes</h1>
                <hr className='my-4' />
                <p className='mb-8'></p>
                <TablaEncomiendasPendientes />
            </div>
        </div>
    );
}

export default ListarEncomiendas;
