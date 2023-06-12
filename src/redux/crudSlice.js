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

export const getAllCategories = createAsyncThunk(
    'getAllCategories',
    async () => {
        const response = await axios.get(
            "https://localhost:7166/api/Categories/getall"
        )
        return response.data
    }
)

export const getAllCities = createAsyncThunk(
    'getAllCities',
    async () => {
        const response = await axios.get(
            "https://localhost:7166/api/Cities/getall"
        )
        return response.data
    }
)

export const getAllInstitutions = createAsyncThunk(
    'getAllInstitutions',
    async () => {
        const response = await axios.get(
            "https://localhost:7166/api/Institutions/getall"
        )
        return response.data
    }
)

export const addBills = createAsyncThunk(
    'addBills',
    async (values) => {
        const response = await axios.post(
            "https://localhost:7166/api/Bills/add",
            {
                "categoryId": values.category,
                "userId": values.userId,
                "cityId": values.city,
                "institutionId": values.institution,
                "contractNo": values.contractNo,
                "invoiceDate": values.invoiceDate,
                "dateOfLastPayment": values.lastPaymentDate,
                "invoiceValue": values.invoiceValue,
            }
        )
        return response.data
    }
)

export const crudSlice = createSlice({
    name: 'user',
    initialState: {
        allBills: { data: '', loading: false, error: ''},
        allCategories: { data: '', loading: false, error: ''},
        allCities: { data: '', loading: false, error: ''},
        allInstitutions: { data: '', loading: false, error: ''},
        addBills: { data: '', loading: false, error: ''}
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

        // getAllCities
        builder.addCase(getAllCities.pending, (state, action) => {
            state.allCities.loading = true
            state.allCities.error = ''
        })
        builder.addCase(getAllCities.fulfilled, (state, action) => {
            state.allCities.data = action.payload
            state.allCities.loading = false
        })
        builder.addCase(getAllCities.rejected, (state, action) => {
            state.allCities.loading = false
            state.allCities.error = 'Request Fetching Error'
        })

        // getAllCategories
        builder.addCase(getAllCategories.pending, (state, action) => {
            state.allCategories.loading = true
            state.allCategories.error = ''
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.allCategories.data = action.payload
            state.allCategories.loading = false
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.allCategories.loading = false
            state.allCategories.error = 'Request Fetching Error'
        })

        // getAllInstitutions
        builder.addCase(getAllInstitutions.pending, (state, action) => {
            state.allInstitutions.loading = true
            state.allInstitutions.error = ''
        })
        builder.addCase(getAllInstitutions.fulfilled, (state, action) => {
            state.allInstitutions.data = action.payload
            state.allInstitutions.loading = false
        })
        builder.addCase(getAllInstitutions.rejected, (state, action) => {
            state.allInstitutions.loading = false
            state.allInstitutions.error = 'Request Fetching Error'
        })

        // addBills
        builder.addCase(addBills.pending, (state, action) => {
            state.addBills.loading = true
            state.addBills.error = ''
        })
        builder.addCase(addBills.fulfilled, (state, action) => {
            state.addBills.data = action.payload
            state.addBills.loading = false
        })
        builder.addCase(addBills.rejected, (state, action) => {
            state.addBills.loading = false
            state.addBills.error = 'Request Fetching Error'
        })
    }
})

export default crudSlice.reducer