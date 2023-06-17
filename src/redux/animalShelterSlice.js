import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' 
import axios from 'axios'

export const getAnimalShelters = createAsyncThunk(
    'getAnimalShelters',
    async () => {
        const response = await axios.get(
            'https://localhost:7166/api/animalshelters/getanimalshelterdetails'
        )
        return response.data
    }
)

export const getFoundations = createAsyncThunk(
    'getFoundations',
    async () => {
        const response = await axios.get(
            'https://localhost:7166/api/Foundations/getbydetails'
        )
        return response.data
    }
)

export const getbyfoundationId = createAsyncThunk(
    'getbyfoundationId',
    async ({id}) => {
        const response = await axios.get(
            `https://localhost:7166/api/FoundationsMapBanks/getbyfoundationid?foundationId=${id}`
        )
        return response.data
    }
)



export const animalShelterSlice = createSlice({
    name: 'animalShelter',
    initialState: {
        allAnimalShelters: { data: '', loading: false, error: ''},
        allFoundations: { data: '', loading: false, error: ''},
        allFoundationsBanks: { data: '', loading: false, error: ''},
    },
    reducers: {},
    extraReducers: (builder) => {

        // getAnimalShelters
        builder.addCase(getAnimalShelters.pending, (state, action) => {
            state.allAnimalShelters.loading = true
            state.allAnimalShelters.error = ''
        })
        builder.addCase(getAnimalShelters.fulfilled, (state, action) => {
            state.allAnimalShelters.data = action.payload
            state.allAnimalShelters.loading = false
        })
        builder.addCase(getAnimalShelters.rejected, (state, action) => {
            state.allAnimalShelters.loading = false
            state.allAnimalShelters.error = 'Request Fetching Error'
        })

        // getFoundations
        builder.addCase(getFoundations.pending, (state, action) => {
            state.allFoundations.loading = true
            state.allFoundations.error = ''
        })
        builder.addCase(getFoundations.fulfilled, (state, action) => {
            state.allFoundations.data = action.payload
            state.allFoundations.loading = false
        })
        builder.addCase(getFoundations.rejected, (state, action) => {
            state.allFoundations.loading = false
            state.allFoundations.error = 'Request Fetching Error'
        })

        // getbyfoundationId
        builder.addCase(getbyfoundationId.pending, (state, action) => {
            state.allFoundationsBanks.loading = true
            state.allFoundationsBanks.error = ''
        })
        builder.addCase(getbyfoundationId.fulfilled, (state, action) => {
            state.allFoundationsBanks.data = action.payload
            state.allFoundationsBanks.loading = false
        })
        builder.addCase(getbyfoundationId.rejected, (state, action) => {
            state.allFoundationsBanks.loading = false
            state.allFoundationsBanks.error = 'Request Fetching Error'
        })
    }
})

export default animalShelterSlice.reducer