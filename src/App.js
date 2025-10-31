import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAction } from "./redux/slice";
import { addContact, deleteContact } from "./redux/operations";
import { getContacts, getFilter } from "./redux/selectors";

import PhoneEditor from "./components/PhoneEditor/PhoneEditor";
import PhoneList from "./components/PhoneList/PhoneList";

import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    if (field === "name") {
      setName(value);
    } else if (field === "number") {
      setNumber(value);
    }
  };

  const handleAddContact = (name, number) => {
    if (!name || !number || name.trim() === "" || number.trim() === "") {
      return;
    }

    const isNameExists = contacts.some(
      (contact) => contact.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isNameExists) {
      alert(`${name} вже є в телефонній книзі!`);
      return;
    }

    dispatch(addContact({ name: name.trim(), number: number.trim() }));
    setName("");
    setNumber("");
  };

  const handleFilterChange = (e) => {
    dispatch(findAction(e.target.value));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <div>
        <PhoneEditor 
          onChange={handleInputChange} 
          name={name} 
          number={number} 
          onAddContact={handleAddContact} 
        />
        <PhoneList 
          contacts={filteredContacts} 
          filter={filter} 
          onFilterChange={handleFilterChange} 
          onDelete={handleDeleteContact} 
        />
      </div>
    </div>
  );
};

export default App;