import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Register from '../page/register';
import Dashboard from '../page/dashboard';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { BACKEND_PORT } from '../../backend.config.json';

describe('happyPath', () => {
    ////////////////////////////////////////////////////////////
    // 1. REGISTERS SUCCESSFULLY
    ////////////////////////////////////////////////////////////
    it('all register fields exist', () => {
        render(<MemoryRouter>
            <Register />
        </MemoryRouter>)  
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const confirmPasswordInput = screen.getByTestId('confirm-password-input');
        const nameInput = screen.getByTestId('name-input');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        screen.debug();
    })
    it('all register fields are initially empty', () => {
        render(<MemoryRouter>
            <Register />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const confirmPasswordInput = screen.getByTestId('confirm-password-input');
        const nameInput = screen.getByTestId('name-input');
        expect(emailInput.value).toBe("");
        expect(passwordInput.value).toBe("");
        expect(confirmPasswordInput.value).toBe("");
        expect(nameInput.value).toBe("");
        screen.debug();
    })
    it('all register fields should be updated', () => {
        render(<MemoryRouter>
            <Register />
        </MemoryRouter>)            
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const confirmPasswordInput = screen.getByTestId('confirm-password-input');
        const nameInput = screen.getByTestId('name-input');
        const testEmailInput = 'test@gmail.com';
        const testPasswordInput = 'testPassword';
        const testConfirmPasswordInput = 'testPassword';
        const testNameInput = 'test';
        fireEvent.change(emailInput, {target: { value: testEmailInput }});
        fireEvent.change(passwordInput, {target: { value: testPasswordInput }});
        fireEvent.change(confirmPasswordInput, {target: { value: testConfirmPasswordInput }});
        fireEvent.change(nameInput, {target: { value: testNameInput }});
        expect(emailInput.value).toBe(testEmailInput);
        expect(passwordInput.value).toBe(testPasswordInput);
        expect(confirmPasswordInput.value).toBe(testConfirmPasswordInput);
        expect(nameInput.value).toBe(testNameInput);
        screen.debug()
    })
    // it('successfully registers the user', async () => {
    //     render(<MemoryRouter>
    //         <Register />
    //     </MemoryRouter>)
    //     const emailInput = screen.getByTestId('email-input');
    //     const passwordInput = screen.getByTestId('wqqpassword-input');
    //     const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    //     const nameInput = screen.getByTestId('name-input');
    //     const testEmailInput = 'test@gmail.com';
    //     const testPasswordInput = 'testPassword';
    //     const testConfirmPasswordInput = 'testPassword';
    //     const testNameInput = 'test';
    //     fireEvent.change(emailInput, {target: { value: testEmailInput }});
    //     fireEvent.change(passwordInput, {target: { value: testPasswordInput }});
    //     fireEvent.change(confirmPasswordInput, {target: { value: testConfirmPasswordInput }});
    //     fireEvent.change(nameInput, {target: { value: testNameInput }});       
    //     const registerBtn = screen.getByTestId('register-btn');
    //     fireEvent.click(registerBtn);

    //     let mock;
    //     mock = new axiosMockAdapter(axios);
    //     mock.onPost(`http://z5363575-presto-deploy-frontend-rho.vercel.app:${BACKEND_PORT}/admin/auth/register`).reply(200);
    //     await waitFor(
    //         render(<MemoryRouter>
    //             <App />
    //             <Dashboard />
    //         </MemoryRouter>)
    //     )
    //     // cy.wait(1000);
    //     await waitFor(() => expect(screen.getByTestId('no-presentations-available')).toHaveTextContent('No presentations available.'));
    //     mock.reset();
    //     screen.debug();
    // })
    ////////////////////////////////////////////////////////////
    // 2. CREATES A PRESENTATION SUCCESSFULLY
    ////////////////////////////////////////////////////////////
    
})