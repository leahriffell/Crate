import reducers from '../state.js';
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Item from '../../../subscription/Item.js';

describe('Reducers', () => {
    const mockState = []

    it('should return an array with a user object if the type is === SET_USER', () => {
        const mockSetUser = {
            type: 'SET_USER',
            isAuthenticated: true, 
            details: {
                name: 'Hulk Hogan',
                email: 'Hulkster@yahoo.com',
                role: 'USER'
            }
        };


        const newUser = reducers(mockState, mockSetUser)

        expect(newUser).toStrictEqual([{details: {
            name: 'Hulk Hogan',
            email: 'Hulkster@yahoo.com',
            role: 'USER'
        }}]);
    });
})