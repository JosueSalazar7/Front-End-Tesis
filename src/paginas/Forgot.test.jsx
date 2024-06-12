import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import {Forgot} from './Forgot';
import { MemoryRouter } from 'react-router-dom';

// Mock de axios
jest.mock('axios');

describe('Forgot', () => {
  test('Renderización del formulario de recuperación de contraseña', async () => {
    // Mock de axios post request
    axios.post.mockResolvedValue({ data: { msg: 'Correo electrónico enviado con éxito' } });

    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );
    
    const emailInput = screen.getByPlaceholderText(/Introduce tu correo electrónico/i);
    const sendButton = screen.getByText(/Enviar correo electrónico/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();

    // Simulación de entrada de correo electrónico
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Simulación de clic en el botón de enviar correo electrónico
    fireEvent.click(sendButton);

    // Espera a que se muestre el mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/Correo electrónico enviado con éxito/i)).toBeInTheDocument();
    });
  });
  test('Manejo de entrada de correo electrónico incorrecta', async () => {
    // Mock de axios post request
    axios.post.mockResolvedValue({ data: { msg: 'Correo electrónico inválido' } });
  
    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByPlaceholderText(/Introduce tu correo electrónico/i);
    const sendButton = screen.getByText(/Enviar correo electrónico/i);
  
    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  
    // Simulación de entrada de correo electrónico incorrecta
    fireEvent.change(emailInput, { target: { value: 'test@example' } });
  
    // Simulación de clic en el botón de enviar correo electrónico
    fireEvent.click(sendButton);
  
    // Espera a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Correo electrónico inválido/i)).toBeInTheDocument();
    });
  });
  
  test('Manejo de errores al enviar el formulario', async () => {
    // Mock de axios post request
    axios.post.mockRejectedValue({ response: { data: { msg: 'Error al enviar el correo electrónico' } } });
  
    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByPlaceholderText(/Introduce tu correo electrónico/i);
    const sendButton = screen.getByText(/Enviar correo electrónico/i);
  
    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  
    // Simulación de entrada de correo electrónico
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  
    // Simulación de clic en el botón de enviar correo electrónico
    fireEvent.click(sendButton);
  
    // Espera a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error al enviar el correo electrónico/i)).toBeInTheDocument();
    });
  });
});
