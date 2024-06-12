import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ActualizarViajePrivado from './ActualizarViajesP'; // Asegúrate de que la ruta es correcta

// Mock the axios library
jest.mock('axios');

describe('ActualizarViajePrivado', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Renderización de elementos clave', async () => {
        // Mock para simular la lista de conductores
        const mockConductores = [
            { _id: '1', conductorNombre: 'Conductor 1' },
            { _id: '2', conductorNombre: 'Conductor 2' },
        ];
        axios.get.mockResolvedValue({ data: mockConductores });

        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <ActualizarViajePrivado />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByText('Actualizar Viaje Privado')).toBeInTheDocument();
            expect(getByText('Conductor asignado:')).toBeInTheDocument();
            expect(getByText('Estado del viaje privado:')).toBeInTheDocument();
        });
    });

    test('Actualización exitosa del viaje privado', async () => {
        // Mock para simular la lista de conductores
        const mockConductores = [
            { _id: '1', conductorNombre: 'Conductor 1' },
            { _id: '2', conductorNombre: 'Conductor 2' },
        ];
        axios.get.mockResolvedValue({ data: mockConductores });

        // Mock para simular la respuesta de actualización
        axios.put.mockResolvedValue({
            data: {
                msg: 'Estado del viaje privado actualizado correctamente'
            }
        });

        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <ActualizarViajePrivado />
            </MemoryRouter>
        );

        await waitFor(() => {
            fireEvent.change(getByLabelText('Conductor asignado:'), { target: { value: '1' } });
            fireEvent.change(getByLabelText('Estado del viaje privado:'), { target: { value: 'Aprobado' } });
        });

        fireEvent.click(getByText('Actualizar'));

        await waitFor(() => {
            expect(getByText('Estado del viaje privado actualizado correctamente')).toBeInTheDocument();
        });
    });
});
