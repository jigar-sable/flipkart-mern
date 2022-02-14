import { REMOVE_FROM_SAVE_FOR_LATER, SAVE_FOR_LATER } from "../constants/saveForLaterConstants";

export const saveForLaterReducer = (state = { saveForLaterItems: [] }, { type, payload }) => {
    switch (type) {
        case SAVE_FOR_LATER:
            const item = payload;
            const isItemExist = state.saveForLaterItems.find((i) => i.product === item.product);
            if (isItemExist) {
                return {
                    ...state,
                    saveForLaterItems: state.saveForLaterItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                }
            } else {
                return {
                    ...state,
                    saveForLaterItems: [...state.saveForLaterItems, item]
                }
            }
        case REMOVE_FROM_SAVE_FOR_LATER:
            return {
                ...state,
                saveForLaterItems: state.saveForLaterItems.filter((i) =>
                    i.product !== payload
                ),
            }
        default:
            return state;
    }
}