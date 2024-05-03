import React from 'react'
import { FormularioRuta } from '../componets/FormularioRuta'



const RegistrarRuta = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Rutas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Registrar una nueva ruta</p>
            <FormularioRuta/>
        </div>
      )
}

export default RegistrarRuta