import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TablaViajesCompartidosPendientes from '../componets/TablaViajesC';
import { MemoryRouter } from 'react-router-dom';

// Mock the axios library
jest.mock('axios');

describe('TablaViajesCompartidosPendientes', () => {
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

    test('Eliminación exitosa de un viaje compartido', async () => {
        // Mock data
        const mockViajesCompartidos = [
            { id: 1, tipoBoleto: 'Tipo 1', nombre: 'John', apellido: 'Doe', ciudadSalida: 'Ciudad A', ciudadLlegada: 'Ciudad B', turno: { horario: 'Mañana' } },
            { id: 2, tipoBoleto: 'Tipo 2', nombre: 'Jane', apellido: 'Smith', ciudadSalida: 'Ciudad C', ciudadLlegada: 'Ciudad D', turno: { horario: 'Tarde' } },
        ];

        // Mock axios get request
        axios.get.mockResolvedValue({ status: 200, data: { boletos: mockViajesCompartidos } });

        // Mock axios delete request
        axios.delete.mockResolvedValue({ status: 200 });

        render(
            <MemoryRouter>
                <TablaViajesCompartidosPendientes />
            </MemoryRouter>
        );

        // Wait for viajes compartidos to be loaded
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
        });

        // Simulate click on delete icon for the first viaje compartido
        await waitFor(() => fireEvent.click(screen.getAllByTestId('eliminar-icono')[0]));

        // Esperar a que la eliminación se complete
        await waitFor(() => {
            expect(screen.queryByText('John')).not.toBeInTheDocument();
        });
        console.log('Viaje compartido eliminado');
        
        // Wait for viajes compartidos to be updated
        await waitFor(() => {
            expect(screen.getByText('No existen viajes compartidos pendientes')).toBeInTheDocument();
        });

        console.log('Tabla actualizada'); 
    }, 15000);
});
