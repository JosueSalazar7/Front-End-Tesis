import carro1 from '../assets/carro1.jpg'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={carro1} alt="image description"/>
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">La página no funciona</p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Lo sentimos, esta página no funciona</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Inicar Sesión</Link>
            </div>
        </div>
    )
}
