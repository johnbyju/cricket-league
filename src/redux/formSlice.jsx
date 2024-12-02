import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  dob: "",
  contactNumber: "",
  email: "",
  photo: null,
  preferredRole: "",
  playerInfo: "",
  bowlingType: "",
  specialSkills: "",
  jerseySize: "",
  medicalConditions: "",
  emergencyContactName: "",
  emergencyContactInfo: "",
  favouriteCricketer: "",
  acknowledgement: "",
  date: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
