import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest'
import Login from '../page/login'
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

// Mock axios module
jest.mock('axios');

// Capture dom element to see if it is there (E.g., Login and then the inputs)
// Mock click the add slide button
// Mock API calls
// Mock some hooks

describe('Login', () => {
    // loginForm: render and check DOM elements are there
    it('render and check for existence of email and password fields', () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        screen.debug();
    })
    // loginForm: check initial values of DOM elements
    it('checks that the email and password fields are empty strings initially', () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        expect(emailInput.value).toBe("");
        expect(passwordInput.value).toBe("");
        screen.debug();
    })
    // loginForm: change the values of the email field and checks for the change
    it('should update email input when typed', () => {
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
    // loginForm: clicking login should generate an error because the email hasn't been registered
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
        
        // Attempting to login with an unregisted email address
        const loginBtn = screen.getByTestId('login-btn');
        fireEvent.click(loginBtn);
        await waitFor(() => {
            const errorMessage = screen.getByTestId('error-message');
            expect(errorMessage).toBeInTheDocument();
            expect(errorMessage).toHaveTextContent('Error: Invalid credentials');
        });

    })
})


