import { useState } from "react";
import "./styles.css";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput(""); 
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <label className="search-bar">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
