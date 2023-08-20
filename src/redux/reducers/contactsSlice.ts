import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state: ContactsState, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    deleteContact: (state: ContactsState, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact: Contact) => contact.id !== action.payload
      );
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const { id, firstName, lastName, email } = action.payload;
      const existingContact = state.contacts.find(
        (contact) => contact.id === id
      );
      if (existingContact) {
        existingContact.firstName = firstName;
        existingContact.lastName = lastName;
        existingContact.email = email;
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
