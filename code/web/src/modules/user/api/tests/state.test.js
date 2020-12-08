import reducers from '../state.js';
import React from 'react'
import '@testing-library/jest-dom'


describe('Reducers', () => {
    const mockDefaultState = {
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    it('should return an array with a user object if the type is === SET_USER', () => {

        const mockIsEmpty = jest.fn()
        
        const mockSetUser = {
            type: 'AUTH/SET_USER',
            user: {
                 name: 'Hulk Hogan',
                 email: 'Hulkster@yahoo.com',
                 role: 'USER' 
              }   
            };

        const expectedOutput = { 
            details: {
              name: 'Hulk Hogan',
              email: 'Hulkster@yahoo.com',
              role: 'USER'
            },
            error: null,
            isAuthenticated: true,
            isLoading: false
      }

        const newUser = reducers(mockDefaultState, mockSetUser)
    
        expect(newUser).toEqual(expectedOutput)
    });
})