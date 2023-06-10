import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' 
import axios from 'axios'

export const getAllBills = createAsyncThunk(
    'getAllBills',
    async () => {
        const response = await axios.get(
            "https://localhost:7166/api/Bills/getbilldetails"
        )
        return response.data
    }
)

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
        allBills: { data: '', loading: false, error: ''},
        login: { data: '', loading: false, error: ''},
        getUser: { data: '', loading: false, error: ''}
    },
    reducers: {},
    extraReducers: (builder) => {
        // getAllBills
        builder.addCase(getAllBills.pending, (state, action) => {
            state.allBills.loading = true
            state.allBills.error = ''
        })
        builder.addCase(getAllBills.fulfilled, (state, action) => {
            state.allBills.data = action.payload
            state.allBills.loading = false
        })
        builder.addCase(getAllBills.rejected, (state, action) => {
            state.allBills.loading = false
            state.allBills.error = 'Request Fetching Error'
        })

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

export const { resetGetUser } = userSlice.actions
export default userSlice.reducer