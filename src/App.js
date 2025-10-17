import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addAction, deleteAction, findAction } from "./redux/slice";
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

  const addContact = (name, number) => {
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

    dispatch(addAction({ name: name.trim(), number: number.trim() }));
    setName("");
    setNumber("");
  };

  const handleFilterChange = (e) => {
    dispatch(findAction(e.target.value));
  };

  const deleteContact = (id) => {
    dispatch(deleteAction(id));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <div>
        <PhoneEditor onChange={handleInputChange} name={name} number={number} onAddContact={addContact} />
        <PhoneList contacts={filteredContacts} filter={filter} onFilterChange={handleFilterChange} onDelete={deleteContact} />
      </div>
    </div>
  );
};

export default App;