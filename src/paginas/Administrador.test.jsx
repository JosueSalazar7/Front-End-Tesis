import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { FormularioRegistroAdmin } from '../componets/FormularioAdministrador';

// Mock the axios library
jest.mock('axios');

describe('FormularioRegistroAdmin', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('Renderización de elementos clave', async () => {
        const { getByPlaceholderText, getAllByText } = render(
            <MemoryRouter>
                <FormularioRegistroAdmin />
            </MemoryRouter>
        );
    
        await waitFor(() => {
            expect(getByPlaceholderText('Nombre')).toBeInTheDocument();
            expect(getByPlaceholderText('Apellido')).toBeInTheDocument();
            expect(getByPlaceholderText('Correo Electrónico')).toBeInTheDocument();
            expect(getByPlaceholderText('Contraseña')).toBeInTheDocument();
            expect(getByPlaceholderText('Teléfono')).toBeInTheDocument();
            expect(getAllByText('Registrar Administrador').length).toBeGreaterThan(0);
        });
    });

    test('Mostrar errores cuando faltan campos requeridos', async () => {
        const { getByText, getByPlaceholderText, getAllByText } = render(
            <MemoryRouter>
                <FormularioRegistroAdmin />
            </MemoryRouter>
        );
    
        fireEvent.change(getByPlaceholderText('Nombre'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Apellido'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Correo Electrónico'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Contraseña'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Teléfono'), { target: { value: '' } });
    
        // Selecciona el botón de "Registrar Administrador" de manera más específica
        const registrarButton = getByText('Registrar Administrador');
        fireEvent.click(registrarButton);
    
        await waitFor(() => {
            expect(getAllByText('Campo Obligatorio').length).toBeGreaterThan(0);
        });
    });
    
    test('Registro exitoso de administrador', async () => {
        axios.post.mockResolvedValue({
            data: {
                msg: 'Administrador registrado exitosamente'
            }
        });
    
        const { getByText, getByPlaceholderText } = render(
            <MemoryRouter>
                <FormularioRegistroAdmin />
            </MemoryRouter>
        );
    
        fireEvent.change(getByPlaceholderText('Nombre'), { target: { value: 'Admin' } });
        fireEvent.change(getByPlaceholderText('Apellido'), { target: { value: 'Apellido' } });
        fireEvent.change(getByPlaceholderText('Correo Electrónico'), { target: { value: 'admin@example.com' } });
        fireEvent.change(getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(getByPlaceholderText('Teléfono'), { target: { value: '1234567890' } });
    
        // Selecciona el botón de "Registrar Administrador" de manera más específica
        const registrarButton = getByText('Registrar Administrador');
        fireEvent.click(registrarButton);
    
        await waitFor(() => {
            expect(getByText('Administrador registrado exitosamente')).toBeInTheDocument();
        });
    });
    
});
