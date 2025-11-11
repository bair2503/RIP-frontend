import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    search: string;
    category: string;
}

const initialState: FiltersState = {
    search: '',
    category: 'Все'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        clearFilters: (state) => {
            state.search = '';
            state.category = 'Все';
        }
    }
});

export const { setSearch, setCategory, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;