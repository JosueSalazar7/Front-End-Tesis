import React from 'react'
import TablaViajesC from '../componets/TablaViajesC'

const ListarRuta = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Rutas</h1>
            <hr className='my-4' />
            <p className='mb-8'></p>
            <TablaViajesC/>
        </div>
      )
}

export default ListarRuta