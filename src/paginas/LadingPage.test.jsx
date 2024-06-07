import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {LandinPage} from './LandinPage.jsx';

describe('LandingPage', () => {
  test('Renderización del mensaje de bienvenida', () => {
    render(
      <MemoryRouter>
        <LandinPage />
      </MemoryRouter>
    );
    const welcomeMessage = screen.getByText(/Empresa de viajes/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('Renderización enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <LandinPage />
      </MemoryRouter>
    );
  
    const inicioLink = screen.getAllByText(/Inicio/i);
    const serviciosLinks = screen.getAllByText(/Nuestros Servicios/i);
    const sobreNosotrosLink = screen.getAllByText(/Sobre Nosotros/i);
    const appMovilLink = screen.getAllByText(/App Móvil/i);
    const iniciarSesionLink = screen.getAllByText(/Iniciar sesión/i);
  
    expect(inicioLink.length).toBeGreaterThan(0);
    expect(serviciosLinks.length).toBeGreaterThan(0);
    expect(sobreNosotrosLink.length).toBeGreaterThan(0);
    expect(appMovilLink.length).toBeGreaterThan(0);
    expect(iniciarSesionLink.length).toBeGreaterThan(0);
  });
  test('Renderización de mensajes e imagenes de nuestros servicios', () => {
    render(
      <MemoryRouter>
        <LandinPage />
      </MemoryRouter>
    );
    const viajesCompartidosImage = screen.getByAltText(/Viajes Compartidos/i);
    const viajesPrivadosImage = screen.getByAltText(/Viajes Privados/i);
    const encomiendaImage = screen.getByAltText(/Envío de Encomiendas/i);
    
    expect(viajesCompartidosImage).toBeInTheDocument();
    expect(viajesPrivadosImage).toBeInTheDocument();
    expect(encomiendaImage).toBeInTheDocument();
  });

  test('Renderización de secciones de misión y visión', () => {
    render(
      <MemoryRouter>
        <LandinPage />
      </MemoryRouter>
    );
    const misionDescription = screen.getByText(/Misión/i);
    const visionDescription = screen.getByText(/Visión/i);
    
    expect(misionDescription).toBeInTheDocument();
    expect(visionDescription).toBeInTheDocument();
  });

  test('Renderización del video y enlace de descarga de la App', () => {
    render(
      <MemoryRouter>
        <LandinPage />
      </MemoryRouter>
    );
    const appVideo = screen.getByTestId('app-video');
    const googlePlayLink = screen.getByAltText(/Descargar en Google Play/i);

    expect(appVideo).toBeInTheDocument();
    expect(googlePlayLink).toBeInTheDocument();
  });
});
