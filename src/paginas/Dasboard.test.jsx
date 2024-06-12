import React from 'react';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../layout/Dashboard';
import AuthContext from '../context/AuthProvider';

describe('Botón de Salir en Dashboard', () => {
    const setAuthMock = jest.fn();

    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Elimina el token de localStorage y redirige al hacer clic en el botón de salir', async () => {
        const { getByRole } = render(
            <AuthContext.Provider value={{ auth: { adminNombre: 'Admin' }, setAuth: setAuthMock, login: jest.fn() }}>
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            </AuthContext.Provider>
        );
    
        // Espera a que el botón de salir esté presente en el documento
        const botonSalir = await waitFor(() => getByRole('link', { name: 'Salir' }));
        fireEvent.click(botonSalir);
    
        await waitFor(() => {
            expect(localStorage.getItem('token')).toBeNull();
        });
    });
});
