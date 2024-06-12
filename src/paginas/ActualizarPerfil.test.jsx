import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ActualizarPerfil from './ActualizarPerfil';

// Mock the axios library
jest.mock('axios');

describe('ActualizarPerfil', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Renderización de elementos clave', async () => {
        axios.get.mockResolvedValue({
            data: {
                adminNombre: 'John',
                adminApellido: 'Doe',
                phone: '1234567890'
            }
        });

        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <ActualizarPerfil />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByLabelText('Nombre')).toBeInTheDocument();
            expect(getByLabelText('Apellido')).toBeInTheDocument();
            expect(getByLabelText('Teléfono')).toBeInTheDocument();
            expect(getByText('Guardar Datos')).toBeInTheDocument();
        });
    });

    test('Mostrar errores cuando faltan campos requeridos', async () => {
        axios.get.mockResolvedValue({
            data: {
                adminNombre: '',
                adminApellido: '',
                phone: ''
            }
        });

        const { getByText, getByLabelText, getAllByText } = render(
            <MemoryRouter>
                <ActualizarPerfil />
            </MemoryRouter>
        );

        await waitFor(() => {
            fireEvent.change(getByLabelText('Nombre'), { target: { value: '' } });
            fireEvent.change(getByLabelText('Apellido'), { target: { value: '' } });
            fireEvent.change(getByLabelText('Teléfono'), { target: { value: '' } });
        });

        fireEvent.click(getByText('Guardar Datos'));

        await waitFor(() => {
            expect(getAllByText('Campo Obligatorio').length).toBeGreaterThan(0);
        });
    });

    test('Actualización exitosa del perfil', async () => {
        axios.get.mockResolvedValue({
            data: {
                adminNombre: 'John',
                adminApellido: 'Doe',
                phone: '1234567890'
            }
        });

        axios.put.mockResolvedValue({
            data: {
                msg: 'Perfil actualizado exitosamente'
            }
        });

        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <ActualizarPerfil />
            </MemoryRouter>
        );

        await waitFor(() => {
            fireEvent.change(getByLabelText('Nombre'), { target: { value: 'John' } });
            fireEvent.change(getByLabelText('Apellido'), { target: { value: 'Doe' } });
            fireEvent.change(getByLabelText('Teléfono'), { target: { value: '1234567890' } });
        });

        fireEvent.click(getByText('Guardar Datos'));

        await waitFor(() => {
            expect(getByText('Perfil actualizado exitosamente')).toBeInTheDocument();
        });
    });
});
