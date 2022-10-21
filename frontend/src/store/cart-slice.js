import { createSlice } from "@reduxjs/toolkit";

const cartSlide = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        location: null,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => {
                return (
                    item.product_id === newItem.product_id &&
                    item.message === newItem.message &&
                    item.weight === newItem.weight
                );
            });

            state.totalQuantity++;
            state.changed = true;

            if (!newItem.location || newItem.location !== "") {
                state.location = newItem.location;
            }

            if (!existingItem) {
                state.items.push({
                    name: newItem.name,
                    product_id: newItem.product_id,
                    price: newItem.price,
                    weight: newItem.weight,
                    message: newItem.message,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const rmItem = action.payload;
            const existingItem = state.items.find((item) => {
                return (
                    item.product_id === rmItem.product_id &&
                    item.message === rmItem.message &&
                    item.weight === rmItem.weight
                );
            });

            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            item.product_id === rmItem.product_id &&
                            item.message === rmItem.message &&
                            item.weight === rmItem.weight
                        )
                );
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
    },
});

export const cartActions = cartSlide.actions;

export default cartSlide;
