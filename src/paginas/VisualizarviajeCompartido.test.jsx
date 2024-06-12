import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import VisualizarViajeCompartido from './VisualizarViajesC';

// Mock the axios library
jest.mock('axios');

describe('VisualizarViajeCompartido', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Renderización de elementos clave', async () => {
        // Mock para simular el resultado de la consulta del viaje compartido
        const mockViajeCompartido = {
            tipoBoleto: 'Económico',
            nombre: 'Juan',
            apellido: 'Pérez',
            ciudadSalida: 'Ciudad A',
            ciudadLlegada: 'Ciudad B',
            turno: {
                horario: '08:00',
                fecha: '2024-06-15'
            }
        };
        axios.get.mockResolvedValue({ data: { boleto: mockViajeCompartido } });

        const { getByText } = render(
            <MemoryRouter>
                <VisualizarViajeCompartido />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByText('Tipo de Boleto:')).toBeInTheDocument();
            expect(getByText('Nombre:')).toBeInTheDocument();
            expect(getByText('Apellido:')).toBeInTheDocument();
            expect(getByText('Ciudad de Salida:')).toBeInTheDocument();
            expect(getByText('Ciudad de Llegada:')).toBeInTheDocument();
            expect(getByText('Horario:')).toBeInTheDocument();
            expect(getByText('Fecha:')).toBeInTheDocument();
        });
    });

});
