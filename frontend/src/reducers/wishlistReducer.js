import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TO_WISHLIST:
            const item = payload;
            const itemExist = state.wishlistItems.find((i) => i.product === item.product);

            if (itemExist) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map((i) =>
                        i.product === itemExist.product ? item : i
                    ),
                }
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                }
            }
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((i) => i.product !== payload)
            }
        default:
            return state;
    }
}