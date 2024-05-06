import React from 'react'
import TablaEncomiendasPendientes from '../componets/TablaEncomiendas'

const ListarEncomiendas = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Encomiendas pendientes</h1>
            <hr className='my-4' />
            <p className='mb-8'></p>
            <TablaEncomiendasPendientes/>
        </div>
      )
}

export default ListarEncomiendas