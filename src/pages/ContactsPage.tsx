import React, { useState } from "react";
import ContactList from "./../components/contactsPage/ContactList";
import ContactModal from "./../components/contactsPage/ContactModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addContact, editContact } from "../redux/reducers/contactsSlice";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ContactsPage: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<null | Contact>(null);

  const handleClose = () => {
    setIsOpen(false);
    setEditingContact(null);
  };

  const handleOnEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsOpen(true);
  };

  const handleAddOrEditContact = (contact: Contact) => {
    if (editingContact) {
      dispatch(editContact(contact));
    } else {
      dispatch(addContact(contact));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-2">Contact List</h1>
      {contacts?.length ? (
        <p className="mb-5">Total Contacts - {contacts.length}</p>
      ) : null}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Add Contact
      </button>
      <ContactModal
        isOpen={isOpen}
        onAdd={handleAddOrEditContact}
        initialContact={editingContact}
        onClose={handleClose}
      />
      <ContactList onEdit={handleOnEdit} />
    </div>
  );
};

export default ContactsPage;
