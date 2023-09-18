import { configureStore } from "@reduxjs/toolkit";
import channelModalReducer from "./features/CreateChannel/channelModalSlice";
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'

const store = configureStore({
  reducer: {
    channelModal: channelModalReducer
  }
})

export default store

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector