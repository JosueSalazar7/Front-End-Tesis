import React from "react";

const CardPerfil = ({ perfil }) => {
  return (
    <div className="bg-white border border-slate-200 h-full p-4 
                    flex flex-col items-center justify-between shadow-xl rounded-lg">

      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
          alt="img-client"
          className="m-auto "
          width={120}
          height={120}
        />
      </div>
      <div className="self-start">
        <b>Nombre:</b>
        <p className="inline-block ml-3">{perfil.adminNombre}</p>
      </div>
      <div className="self-start">
        <b>Apellido:</b>
        <p className="inline-block ml-3">{perfil.adminApellido}</p>
      </div>
      <div className="self-start">
        <b>Teléfono:</b>
        <p className="inline-block ml-3">{perfil.phone}</p>
      </div>
      <div className="self-start">
        <b>Correo:</b>
        <p className="inline-block ml-3">{perfil.correo}</p>
      </div>

    </div>
  );
};

export default CardPerfil;
