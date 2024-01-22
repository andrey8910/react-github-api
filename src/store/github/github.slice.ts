import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFavouritesState} from "../../models/models.ts";

const LS_FAV_KEY = 'rfk';


interface GithubState {
    favourites: IFavouritesState[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<IFavouritesState>){
            state.favourites.push(action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(f => f.repo_link !== action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
    }
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;