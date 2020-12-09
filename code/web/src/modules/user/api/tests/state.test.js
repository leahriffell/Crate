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

    it('should return with a user object if the type is === SET_USER', () => {
        
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

    it('should return with an object if the type is === LOGIN_REQUEST', () => {

        // it passes, but not sure if I need to include userCredentials in mockUser
        const mockUser = {
            type: 'AUTH/LOGIN_REQUEST',
            isLoading: false  
         };

         const expectedOutput = {
            details: null,
            error: null,
            isAuthenticated: false,
            isLoading: false
         };

         const newUserLogin = reducers(mockDefaultState, mockUser)

         expect(newUserLogin).toEqual(expectedOutput)
    });

    it ('should return with an object if the type is === LOGIN_RESPONSE', () => {

        const mockUser = {
            type: 'AUTH/LOGIN_RESPONSE',
            error: false  
         };

         const mockUserError = {
            type: 'AUTH/LOGIN_RESPONSE',
            error: true  
         };

         const expectedFalseOutput = {
            details: null,
            error: false,
            isAuthenticated: false,
            isLoading: false
         }

         const expectedTrueOutput = {
            details: null,
            error: true,
            isAuthenticated: false,
            isLoading: false
         }

         const newUserLogin = reducers(mockDefaultState, mockUser)
         const newUserLoginError = reducers(mockDefaultState, mockUserError)

         expect(newUserLogin).toEqual(expectedFalseOutput)
         expect(newUserLoginError).toEqual(expectedTrueOutput)
    })
})