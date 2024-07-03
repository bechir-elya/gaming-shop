import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';



export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        productData: localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : []
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const { _id } = payload;
            const product = state.productData.findIndex((item) => item._id === _id);
            console.log(product);
            if (product > -1) {
                state.productData[product] = { ...payload, quantity: state.productData[product].quantity + 1 };
            } else {
                state.productData.push({ ...payload, quantity: 1 });
                toast.success('Product added to cart', {
                    position: "bottom-right",
                });
            }
            localStorage.setItem('productList', JSON.stringify(state.productData));
        },


        decrementQty: (state, { payload }) => {
            const { _id } = payload;
            const product = state.productData.findIndex((item) => item._id === _id);
            if (state.productData[product].quantity > 1) {
                state.productData[product] = { ...payload, quantity: state.productData[product].quantity - 1 };
            } else {
                state.productData.splice(product, 1)
            }
            localStorage.setItem('productList', JSON.stringify(state.productData));
        },


        deleteProduct: (state, { payload }) => {
            const { _id } = payload;
            const product = state.productData.findIndex((item) => item._id === _id);
            state.productData.splice(product, 1);
            localStorage.setItem('productList', JSON.stringify(state.productData));
        },


        clearCart: (state) => {
            state.productData = [];
            localStorage.removeItem('productList');
        }
    },
})


export const { addToCart, decrementQty, deleteProduct, clearCart } = shopSlice.actions;
export const shopCart = (state) => state.shop.productData;
export default shopSlice.reducer;
