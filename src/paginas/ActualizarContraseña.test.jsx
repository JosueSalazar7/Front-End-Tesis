import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ActualizarContrasena from './ActualizarContraseña';

// Mock the axios library
jest.mock('axios');

describe('ActualizarContrasena', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Renderización de elementos clave', async () => {
        const { getByText, getByLabelText, getAllByText } = render(
            <MemoryRouter>
                <ActualizarContrasena />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByLabelText('Contraseña Actual')).toBeInTheDocument();
            expect(getByLabelText('Nueva Contraseña')).toBeInTheDocument();
            // Usa getAllByText y asegúrate de que haya más de un elemento coincidente
            expect(getAllByText('Actualizar Contraseña').length).toBeGreaterThan(0);
        });
    });

    test('Mostrar errores cuando faltan campos requeridos', async () => {
        const { getByText, getByLabelText, getAllByText } = render(
            <MemoryRouter>
                <ActualizarContrasena />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText('Contraseña Actual'), { target: { value: '' } });
        fireEvent.change(getByLabelText('Nueva Contraseña'), { target: { value: '' } });

        // Selecciona el botón de "Actualizar Contraseña" de manera más específica
        const actualizarButton = getAllByText('Actualizar Contraseña').find(
            el => el.tagName.toLowerCase() === 'button'
        );
        fireEvent.click(actualizarButton);

        await waitFor(() => {
            expect(getAllByText('Campo Obligatorio').length).toBeGreaterThan(0);
        });
    });

    test('Actualización exitosa de la contraseña', async () => {
        axios.put.mockResolvedValue({
            data: {
                msg: 'Contraseña actualizada exitosamente'
            }
        });

        const { getByText, getByLabelText, getAllByText } = render(
            <MemoryRouter>
                <ActualizarContrasena />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText('Contraseña Actual'), { target: { value: 'oldPassword123' } });
        fireEvent.change(getByLabelText('Nueva Contraseña'), { target: { value: 'newPassword123' } });

        // Selecciona el botón de "Actualizar Contraseña" de manera más específica
        const actualizarButton = getAllByText('Actualizar Contraseña').find(
            el => el.tagName.toLowerCase() === 'button'
        );
        fireEvent.click(actualizarButton);

        await waitFor(() => {
            expect(getByText('Contraseña actualizada exitosamente')).toBeInTheDocument();
        });
    });
});
