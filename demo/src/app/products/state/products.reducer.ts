import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductState {
    showProductCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

const initialState: ProductState = {
    showProductCode: true,
    loading: false,
    products: [],
    errorMessage: ''
}

export const productsReducer = createReducer(
    initialState,
    //Show Product Code
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode,
    })),

    //Load Products
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        products: [],
        errorMessage: '',
    })),

    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products
    })),

    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
        ...state,
        products: [],
        errorMessage: message,
        loading: false
    })),

    //Add Product
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        errorMessage: '',
        loading: true
    })),

    on(ProductsAPIActions.productAddedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: [...state.products, product]
    })),

    on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),

    //Update Product
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        errorMessage: '',
        loading: true
    })),

    on(ProductsAPIActions.productUpdatedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products.map((existingProduct) =>
            existingProduct.id === product.id ? product : existingProduct
        ),
    })),

    on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),

    //Delete Product
    on(ProductsPageActions.deleteProduct, (state) => ({
        ...state,
        errorMessage: '',
        loading: true
    })),

    on(ProductsAPIActions.productDeletedSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        products: state.products.filter(
            (existingProduct) => existingProduct.id !== id
        ),
    })),

    on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    }))
)