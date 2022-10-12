import { configureStore} from "@reduxjs/toolkit";
import registerSlice from "./Slices/RegisterSlice";
export const store = configureStore({
    reducer:{
        register: registerSlice
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;