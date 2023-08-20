import React from "react";
import ContactCard from "./ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteContact } from "../../redux/reducers/contactsSlice";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactListProps {
  onEdit: (arg0: Contact) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ onEdit }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDeleteContact = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="mt-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={handleDeleteContact}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ContactList;
