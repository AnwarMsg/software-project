import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './features/auth/LoginReducer'
import RegisterReducer from './features/auth/RegisterReducer'

export const store = configureStore({
    reducer: {
        LoginRedux : LoginReducer,
        RegisterRedux : RegisterReducer,
    },
})