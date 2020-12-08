import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Profile from '../profile.js'
import { profileState } from '../profile.js'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { createStore } from 'redux'
import rootReducer from '../../../setup/store.js'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

const mockStore = configureStore([])

describe("Profile", () => {
  let store;
  let component;
  it('should display profile text and buttons', () => {
    const rootReducer = jest.fn()
    const store = mockStore({
      user: {
        details: {
          name: 'Joe User',
          email: 'Joe@email.com',
          role: 'USER'
        }
      }
    })

    component = renderer.create(
      <Provider store={store} >
        <BrowserRouter>
            <Profile/>
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
//
