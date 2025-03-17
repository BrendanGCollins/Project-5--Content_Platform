// src/SearchForm.js
import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  // State to hold search criteria: title and category.
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  // Handle form submission by preventing default behavior and passing filters to onSearch.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ title, category });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Search Articles</h2>
      <div>
        <label htmlFor="search-title">Title:</label>
        <input
          id="search-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
        />
      </div>
      <div>
        <label htmlFor="search-category">Category:</label>
        <input
          id="search-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search by category"
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
