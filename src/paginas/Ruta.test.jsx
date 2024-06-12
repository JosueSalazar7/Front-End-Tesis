import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TablaRuta from '../componets/TablaRuta';
import { MemoryRouter } from 'react-router-dom';

// Mock the axios library
jest.mock('axios');

describe('TablaRuta', () => {
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

    test('Eliminación exitosa de una ruta', async () => {
        // Mock data
        const mockRutas = [
            { _id: '1', ruta: { nombre: 'Ruta 1', ciudad1: 'Ciudad A', ciudad2: 'Ciudad B' }, horario: { horario1: '08:00', horario2: '12:00', horario3: '16:00' } },
            { _id: '2', ruta: { nombre: 'Ruta 2', ciudad1: 'Ciudad C', ciudad2: 'Ciudad D' }, horario: { horario1: '09:00', horario2: '13:00', horario3: '17:00' } },
        ];

        // Mock axios get request
        axios.get.mockResolvedValue({ status: 200, data: mockRutas });

        // Mock axios delete request
        axios.delete.mockResolvedValue({ status: 200 });

        render(
            <MemoryRouter>
                <TablaRuta />
            </MemoryRouter>
        );

        // Wait for rutas to be loaded
        await waitFor(() => {
            expect(screen.getByText('Ruta 1')).toBeInTheDocument();
            expect(screen.getByText('Ruta 2')).toBeInTheDocument();
        });

        // Simulate click on delete icon for the first ruta
        await waitFor(() => fireEvent.click(screen.getAllByTestId('eliminar-icono')[0]));

        // Wait for the deletion to complete
        await waitFor(() => {
            expect(screen.queryByText('Ruta 1')).not.toBeInTheDocument();
        });

        // Wait for rutas to be updated
        await waitFor(() => {
            expect(screen.getByText('No existen registros')).toBeInTheDocument();
        });
    }, 15000);
});
