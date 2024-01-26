import {configureStore} from '@reduxjs/toolkit';
import {contactSlice} from './ContactSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store= configureStore({
    reducer:{
         contacts: contactSlice.reducer
    },
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;