import React from "react";

const CardPerfil = ({ perfil }) => {
  return (
    <div className="bg-white border border-slate-200 h-full p-8 
                    flex flex-col items-center justify-between shadow-xl rounded-lg">

      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
          alt="img-client"
          className="m-auto"
          width={150}
          height={150}
        />
      </div>
      <div className="self-start mt-4">
        <b className="text-xl">Nombre:</b>
        <p className="inline-block ml-3 text-xl">{perfil.adminNombre}</p>
      </div>
      <div className="self-start mt-2">
        <b className="text-xl">Apellido:</b>
        <p className="inline-block ml-3 text-xl">{perfil.adminApellido}</p>
      </div>
      <div className="self-start mt-2">
        <b className="text-xl">Teléfono:</b>
        <p className="inline-block ml-3 text-xl">{perfil.phone}</p>
      </div>
      <div className="self-start mt-2">
        <b className="text-xl">Correo:</b>
        <p className="inline-block ml-3 text-xl">{perfil.correo}</p>
      </div>

    </div>
  );
};

export default CardPerfil;
