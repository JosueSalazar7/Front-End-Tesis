import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Tabla from '../componets/Tabla';
import { MemoryRouter } from 'react-router-dom';

// Mock the axios library
jest.mock('axios');

describe('Tabla', () => {
  // Agregar código para simular confirmación antes de ejecutar las pruebas
  beforeAll(() => {
    window.confirm = jest.fn().mockImplementation(() => true); // Simula que el usuario siempre confirma
  });

  afterAll(() => {
    window.confirm.mockRestore(); // Restaura la función original después de que todas las pruebas hayan terminado
  });

  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Eliminación exitosa de un conductor', async () => {
    // Mock data
    const mockConductores = [
      { _id: '1', conductorNombre: 'Conductor 1', conductorApellido: 'Apellido 1', correo: 'correo1@example.com', phone: '1234567890' },
      { _id: '2', conductorNombre: 'Conductor 2', conductorApellido: 'Apellido 2', correo: 'correo2@example.com', phone: '0987654321' },
    ];

    // Mock axios get request
    axios.get.mockResolvedValue({ status: 200, data: mockConductores });

    // Mock axios delete request
    axios.delete.mockResolvedValue({ status: 200 });

    render(
      <MemoryRouter>
        <Tabla />
      </MemoryRouter>
    );

    // Wait for conductores to be loaded
    await waitFor(() => {
      expect(screen.getByText('Conductor 1')).toBeInTheDocument();
      expect(screen.getByText('Conductor 2')).toBeInTheDocument();
    });

    // Simulate click on delete icon for the first conductor
    await waitFor(() => fireEvent.click(screen.getAllByTestId('eliminar-icono')[0]));

    // Wait for the deletion to complete
    await waitFor(() => {
      expect(screen.queryByText('Conductor 1')).not.toBeInTheDocument();
    });

    // Wait for conductores to be updated
    await waitFor(() => {
      expect(screen.getByText('No existen registros')).toBeInTheDocument();
    });
  }, 15000);
});