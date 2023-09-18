import {createSlice} from '@reduxjs/toolkit'

const channelModalSlice = createSlice({
  name: 'channelModal',
  initialState: {
    isOpen: false
  },
  reducers: {
    open: state => {
      state.isOpen = true
    },
    close: state => {
      state.isOpen = false
    }
  }
})

export const {open: openModal, close: closeModal} = channelModalSlice.actions

export default channelModalSlice.reducer