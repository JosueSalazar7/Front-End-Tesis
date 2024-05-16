import React from 'react'
import { FormularioRegistroAdmin } from '../componets/FormularioAdministrador'

const RegisterAdmin = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Administrador</h1>
            <hr className='my-4' />
            <p className='mb-8'>Registrar un nuevo administrador</p>
            <FormularioRegistroAdmin/>
        </div>
      )
}

export default RegisterAdmin;
