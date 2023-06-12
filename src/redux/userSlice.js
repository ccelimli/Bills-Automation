import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' 
import axios from 'axios'

export const userLogin = createAsyncThunk(
    'userLogin',
    async (values) => {
        const response = await axios.post(
            "https://localhost:7166/api/Auth/login",
            {
                nationalityId: values.tcNumber,
                password: values.password
            }
        )
        return response.data
    }
)

export const userRegister = createAsyncThunk(
    'userRegister',
    async (values) => {
        console.log('values : ', values);
        const response = await axios.post(
            "https://localhost:7166/api/Auth/register",
            {
                "firstName": values.firstName,
                "lastName": values.lastName,
                "phoneNumber": values.phoneNumber,
                "address": values.address,
                "cityId": values.cityId,
                "birthday": values.birthday,
                "nationalityNo": values.nationalityNo,
                "email": values.email,
                "password": values.password
            }
        )
        return response.data
    }
)

export const getUserById = createAsyncThunk(
    'getUserById',
    async (values) => {
        const response = await axios.get(
            `https://localhost:7166/api/users/getbyid?id=${values.currentUserId}`
        )
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: { data: '', loading: false, error: ''},
        register: { data: '', loading: false, error: ''},
        getUser: { data: '', loading: false, error: ''}
    },
    reducers: {},
    extraReducers: (builder) => {
        // userLogin
        builder.addCase(userLogin.pending, (state, action) => {
            state.login.loading = true
            state.login.error = ''
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.login.data = action.payload
            state.login.loading = false
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.login.loading = false
            state.login.error = 'Request Fetching Error'
        })

        // userRegister
        builder.addCase(userRegister.pending, (state, action) => {
            state.register.loading = true
            state.register.error = ''
        })
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.register.data = action.payload
            state.register.loading = false
        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.register.loading = false
            state.register.error = 'Request Fetching Error'
        })

        // getUserById
        builder.addCase(getUserById.pending, (state, action) => {
            state.getUser.loading = true
            state.getUser.error = ''
        })
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.getUser.data = action.payload
            state.getUser.loading = false
        })
        builder.addCase(getUserById.rejected, (state, action) => {
            state.getUser.loading = false
            state.getUser.error = 'Request Fetching Error'
        })
    }
})

export default userSlice.reducer