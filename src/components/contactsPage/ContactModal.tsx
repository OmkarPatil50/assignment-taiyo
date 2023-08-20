import React, { useEffect, useState } from "react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onAdd: (newContact: Contact) => void;
  initialContact: Contact | null;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onAdd,
  initialContact,
  onClose,
}) => {
  const [firstName, setFirstName] = useState(initialContact?.firstName || "");
  const [lastName, setLastName] = useState(initialContact?.lastName || "");
  const [email, setEmail] = useState(initialContact?.email || "");

  useEffect(() => {
    if (initialContact) {
      setFirstName(initialContact.firstName);
      setLastName(initialContact.lastName);
      setEmail(initialContact.email);
    }
  }, [initialContact]);

  const handleSubmit = () => {
    const editedContact: Contact = {
      id: initialContact ? initialContact.id : Date.now(),
      firstName,
      lastName,
      email,
    };

    onAdd(editedContact);
    setFirstName("");
    setLastName("");
    setEmail("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Add Contact</h2>
            <input
              className="w-full mb-2 px-2 py-1 border"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-full mb-2 px-2 py-1 border"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="w-full mb-2 px-2 py-1 border"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              {initialContact ? "Save" : "Add"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
