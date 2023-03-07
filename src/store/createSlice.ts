import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  setLoginState: boolean;
}

const name = "app";

const initalState: StateType = {
  setLoginState: false,
};

export const AppSlice = createSlice({
  name,
  initialState: { initalState },
  reducers: {
    setLoginState: (
      state,
      action: PayloadAction<{ setGradeState: boolean }>
    ) => {
      state.initalState.setLoginState = action.payload.setGradeState;
    },
  },
  extraReducers: {},
});

export const { setLoginState } = AppSlice.actions;

export default AppSlice.reducer;
