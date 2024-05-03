import React from 'react'
import TablaRuta from '../componets/TablaRuta'

const ListarRuta = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Rutas</h1>
            <hr className='my-4' />
            <p className='mb-8'></p>
            <TablaRuta/>
        </div>
      )
}

export default ListarRuta