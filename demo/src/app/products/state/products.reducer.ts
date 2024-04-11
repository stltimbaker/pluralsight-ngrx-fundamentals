import { createAction, createReducer, on } from "@ngrx/store";

export interface ProductState {
    showProductCode: boolean;
}

const initialState: ProductState = {
    showProductCode: true
}

export const productsReducer = createReducer(
    initialState, 
    on(createAction('[Products Page] Toggle Show Product Code'), (state) => ({
        ...state, 
        showProductCode: !state.showProductCode
    }))
)