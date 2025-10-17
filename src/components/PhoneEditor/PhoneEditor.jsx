import { useEffect, useRef } from "react";
import { StyledPhoneEditor } from "./StyledPhoneEditor";

const PhoneEditor = ({ onChange, name, number, onAddContact }) => {
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange(name, value);

    if (name === "number") {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        const allowedSymbols = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "+",
          "-",
          "(",
          ")",
          " ",
        ];
        const filteredValue = value
          .split("")
          .filter((symbol) => allowedSymbols.includes(symbol))
          .join("");

        if (filteredValue !== value) {
          onChange(name, filteredValue);
        }
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const validateInput = (value, type) => {
    if (!value || value.trim() === "") {
      alert("Будь ласка, заповніть поле");
      return false;
    }

    if (type === "name") {
      const trimmedValue = value.trim();
      if (trimmedValue.length < 2 || trimmedValue.length > 30) {
        alert("Ім'я повинно містити від 2 до 30 символів");
        return false;
      }
      return true;
    }

    if (type === "number") {
      const digitsOnly = value
        .split("")
        .filter((char) => !isNaN(parseInt(char)))
        .join("");

      if (digitsOnly.length < 6 || digitsOnly.length > 15) {
        alert("Номер повинен містити від 6 до 15 цифр");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !number || name.trim() === "" || number.trim() === "") {
      alert("Будь ласка, заповніть всі поля");
      return;
    }

    if (!validateInput(name, "name") || !validateInput(number, "number")) {
      return;
    }

    onAddContact(name.trim(), number.trim());
  };

  return (
    <StyledPhoneEditor>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Name</h2>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            title="Ім'я (2-30 символів)"
            required
          />
        </div>
        <div>
          <h2>Number</h2>
          <input
            type="tel"
            value={number}
            onChange={handleChange}
            name="number"
            title="Номер (6-15 цифр, може містити +, -, пробіли, дужки)"
            required
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    </StyledPhoneEditor>
  );
};

export default PhoneEditor;