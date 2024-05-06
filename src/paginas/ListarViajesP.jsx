import React from 'react'
import TablaViajesPrivadosPendientes from '../componets/TablaViajesP'

const ListarViajesP = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Viajes privados pendientes</h1>
            <hr className='my-4' />
            <p className='mb-8'></p>
            <TablaViajesPrivadosPendientes/>
        </div>
      )
}

export default ListarViajesP