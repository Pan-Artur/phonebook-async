import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  contacts: [],
  filter: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addAction(state, action) {
      const newContact = {
        id: nanoid(5),
        name: action.payload.name,
        number: action.payload.number,
      };

      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };
    },
    deleteAction(state, action) {
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    },
    findAction(state, action) {
      return {
        ...state,
        filter: action.payload,
      };
    },
  },
});

export const { addAction, deleteAction, findAction } = contactsSlice.actions;
export default contactsSlice.reducer;