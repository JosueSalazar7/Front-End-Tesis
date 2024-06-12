import React from 'react';
import { render, fireEvent, waitFor, getAllByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');

describe('Login', () => {
  test('Renderización de elementos clave', () => {
    const { getByText } = render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(getByText('¡Bienvenido de nuevo!')).toBeInTheDocument();
    expect(getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('Mostrar error cuando faltan campos requeridos', async () => {
    const { getByText, getByPlaceholderText, getAllByText } = render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.click(getByText('Iniciar sesión'));

    await waitFor(() => {
      const errorMessages = getAllByText('Debe llenar todos los campos');
      expect(errorMessages.length).toBeGreaterThan(0);
      errorMessages.forEach((message) => {
        expect(message).toBeInTheDocument();
      });
    });
  });

  test('Navegación al dashboard después de login exitoso', async () => {
    axios.post.mockResolvedValue({
      data: {
        token: 'fake-token',
        user: {
          id: 1,
          email: 'test@example.com'
        }
      }
    });

    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(getByPlaceholderText('Introduce tu correo electrónico'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('********************'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Iniciar sesión'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

});
