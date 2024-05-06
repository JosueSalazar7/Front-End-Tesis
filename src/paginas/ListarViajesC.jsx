import React from 'react'
import TablaViajesCompartidosPendientes from '../componets/TablaViajesC'

const ListarViajesC = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Viajes compartidos pendeintes</h1>
            <hr className='my-4' />
            <p className='mb-8'></p>
            <TablaViajesCompartidosPendientes/>
        </div>
      )
}

export default ListarViajesC