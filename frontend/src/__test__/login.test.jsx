import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest'
import Login from '../page/login'
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { BACKEND_PORT } from '../../backend.config.json';

describe('Login', () => {
    // renders and checks for DOM element existence
    it('email and password fields exist', () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        screen.debug();
    })
    // renders and checks for DOM element initial values
    it('email and password fields are both empty strings initially', () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        expect(emailInput.value).toBe("");
        expect(passwordInput.value).toBe("");
        screen.debug();
    })
    // updates the DOM element values
    it('should update the email and password fields input when typed', () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const testEmailInput = 'test@gmail.com';
        const testPasswordInput = 'testPassword';
        fireEvent.change(emailInput, {target: { value: testEmailInput }});
        fireEvent.change(passwordInput, {target: { value: testPasswordInput }});
        expect(emailInput.value).toBe(testEmailInput);
        expect(passwordInput.value).toBe(testPasswordInput);
        screen.debug()
    })
    // renders and checks that an unregistered email and password is generates an error
    it('should generate an error upon login click', async () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const testEmailInput = 'test@gmail.com';
        const testPasswordInput = 'testPassword';
        fireEvent.change(emailInput, {target: { value: testEmailInput }});
        fireEvent.change(passwordInput, {target: { value: testPasswordInput }});        
        const loginBtn = screen.getByTestId('login-btn');
        fireEvent.click(loginBtn);
        let mock;
        mock = new axiosMockAdapter(axios);
        mock.onPost(`http://localhost:${BACKEND_PORT}/admin/auth/login`).reply(500);
        await waitFor(() => expect(screen.getByTestId('error-message')).toHaveTextContent('Error: Invalid username or password'));
        mock.reset();
    })
})


