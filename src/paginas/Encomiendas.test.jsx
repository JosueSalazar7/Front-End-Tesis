import React from 'react';
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TablaEncomiendasPendientes from '../componets/TablaEncomiendas';
import { MemoryRouter } from 'react-router-dom';


// Mock the axios library
jest.mock('axios');

describe('TablaEncomiendasPendientes', () => {
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

    test('Eliminación exitosa de una encomienda', async () => {
        // Mock data
        const mockEncomiendas = [
            { id: 1, tipoEncomienda: 'Tipo 1', nombreRemitente: 'John', apellidoRemitente: 'Doe', ciudadSalida: 'Ciudad A', ciudadLlegada: 'Ciudad B', turno: { horario: 'Mañana' } },
            { id: 2, tipoEncomienda: 'Tipo 2', nombreRemitente: 'Jane', apellidoRemitente: 'Smith', ciudadSalida: 'Ciudad C', ciudadLlegada: 'Ciudad D', turno: { horario: 'Tarde' } },
        ];

        // Mock axios get request
        axios.get.mockResolvedValue({ status: 200, data: { encomiendas: mockEncomiendas } });

        // Mock axios delete request
        axios.delete.mockResolvedValue({ status: 200 });

        render(
            <MemoryRouter>
                <TablaEncomiendasPendientes />
            </MemoryRouter>
        );

        // Wait for encomiendas to be loaded
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
        });

        // Simulate click on delete icon for the first encomienda
        // Simulate click on delete icon for the first encomienda
        await waitFor(() => fireEvent.click(screen.getAllByTestId('eliminar-icono')[0]));


        // Mock confirm dialog
        // Esperar a que la eliminación se complete
        // Esperar a que la eliminación se complete
        await waitFor(() => {
            expect(screen.queryByText('John')).not.toBeInTheDocument();
        });
        console.log('Encomienda eliminada');
        // Wait for encomiendas to be updated
        // Wait for encomiendas to be updated
        await waitFor(() => {
            expect(screen.getByText('No existen encomiendas pendientes')).toBeInTheDocument();
          });

          console.log('Tabla actualizada'); 
    }, 15000);
});
