import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  setLoginState: boolean;
  setTeacherState: number[];
}

const name = "app";

const initalState: StateType = {
  setLoginState: false,
  setTeacherState: [],
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
    setTeacherState: (
      state,
      action: PayloadAction<{ setSelfStudyState: number[] }>
    ) => {
      state.initalState.setTeacherState = action.payload.setSelfStudyState;
    },
  },
  extraReducers: {},
});

export const { setLoginState, setTeacherState } = AppSlice.actions;

export default AppSlice.reducer;
