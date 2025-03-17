// src/components/EditArticleForm.js
import React, { useState } from 'react';

// EditArticleForm component for updating an existing article.
//
// article: The article to be edited (contains id, title, content, etc.).
// onUpdate: Callback function to handle the updated article in the parent component.
const EditArticleForm = ({ article, onUpdate }) => {
  // Initialize form state with existing article data.
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [error, setError] = useState(null);

  // Handles form submission by sending a PUT request to update the article.
  // e: The form submission event.
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/articles/${article.id}/update/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update article');
        }
        return response.json();
      })
      .then((updatedArticle) => {
        // Pass the updated article back to the parent component.
        onUpdate(updatedArticle);
      })
      .catch((err) => {
        console.error('Error updating article:', err);
        setError(err.message);
        alert('Error updating article: ' + err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Article</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        <label htmlFor="edit-title">Title:</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="edit-content">Content:</label>
        <textarea
          id="edit-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Article</button>
    </form>
  );
};

export default EditArticleForm;
