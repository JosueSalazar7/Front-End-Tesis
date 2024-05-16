import React from 'react'
import TablaPasajeros from '../componets/TablaPasajeros'

const ListarPasajeros = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Pasajeros</h1>
            <hr className='my-4' />
            <p className='mb-8'></p>
            <TablaPasajeros/>
        </div>
      )
}

export default ListarPasajeros