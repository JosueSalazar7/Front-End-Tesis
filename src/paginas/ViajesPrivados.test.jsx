import React from 'react';
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TablaViajesPrivadosPendientes from '../componets/TablaViajesP';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

// Mock the axios library
jest.mock('axios');

describe('TablaViajesPrivadosPendientes', () => {
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

    test('Eliminación exitosa de un viaje privado', async () => {
        // Mock data
        const mockViajesPrivados = [
            { id: 1, tipoBoleto: 'Tipo 1', nombre: 'John', apellido: 'Doe', ciudadSalida: 'Ciudad A', ciudadLlegada: 'Ciudad B', turno: { horario: 'Mañana' } },
            { id: 2, tipoBoleto: 'Tipo 2', nombre: 'Jane', apellido: 'Smith', ciudadSalida: 'Ciudad C', ciudadLlegada: 'Ciudad D', turno: { horario: 'Tarde' } },
        ];

        // Mock axios get request
        axios.get.mockResolvedValue({ status: 200, data: { boletos: mockViajesPrivados } });

        // Mock axios delete request
        axios.delete.mockResolvedValue({ status: 200 });

        render(
            <MemoryRouter>
                <TablaViajesPrivadosPendientes />
            </MemoryRouter>
        );

        // Wait for viajes privados to be loaded
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
        });

        // Simulate click on delete icon for the first viaje privado
        await waitFor(() => fireEvent.click(screen.getAllByTestId('eliminar-icono')[0]));

        // Mock confirm dialog
        // Esperar a que la eliminación se complete
        await waitFor(() => {
            expect(screen.queryByText('John')).not.toBeInTheDocument();
        });
        console.log('Viaje privado eliminado');
        
        // Wait for viajes privados to be updated
        await waitFor(() => {
            expect(screen.getByText('No existen viajes privados pendientes')).toBeInTheDocument();
        });

        console.log('Tabla actualizada'); 
    }, 15000);
});
