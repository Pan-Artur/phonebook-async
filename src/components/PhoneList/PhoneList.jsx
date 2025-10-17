import { useEffect, useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { StyledPhoneList } from "./StyledPhoneList";

const PhoneList = ({ contacts, filter, onFilterChange, onDelete }) => {
  const prevContactsRef = useRef();

  useEffect(() => {
    if (prevContactsRef.current !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    prevContactsRef.current = contacts;
  }, [contacts]);

  const hasContacts = contacts.length > 0;

  return (
    <StyledPhoneList>
      <h2>Contacts</h2>
      <div>
        <label htmlFor="filter">Find contacts by name</label>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={onFilterChange}
        />
      </div>

      {!hasContacts && <p>No contacts yet...</p>}

      {hasContacts && (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <FaPhoneAlt />
              <p>
                {contact.name}: {contact.number}
              </p>
              <button
                type="button"
                onClick={() => onDelete(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </StyledPhoneList>
  );
};

export default PhoneList;