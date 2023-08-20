import React from "react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: number) => void;
  onEdit: (arg0: Contact) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="border p-4 mb-4">
      <div className="font-semibold">
        {contact.firstName} {contact.lastName}
      </div>
      <div className="text-gray-600">{contact.email}</div>
      <div className="mt-2">
        <button className="text-blue-500 mr-2" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button className="text-red-500" onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
