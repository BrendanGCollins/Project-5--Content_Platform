// Import React and useState hook for managing form state.
import React, { useState } from 'react';

// ArticleForm component receives the addArticle callback as a prop.
const ArticleForm = ({ addArticle }) => {
  // State variables for the article title and content.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Function to handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    // Create a new article object using current state values.
    const newArticle = { title, content };

    // Send a POST request to the Django API to add the new article.
    fetch('/api/articles/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Convert the article object to a JSON string.
      body: JSON.stringify(newArticle)
    })
      .then(response => {
        // Check if the response is OK (status in the range 200-299).
        if (!response.ok) {
          // If not, throw an error to be caught later.
          throw new Error('Failed to create article');
        }
        // Otherwise, convert the response to JSON.
        return response.json();
      })
      .then(data => {
        addArticle(data); // Update articles list in the parent component.
        setTitle('');     // Clear the title input field.
        setContent('');   // Clear the content textarea.
      })
      .catch(error => {
        // Log errors to the console and alert the user.
        console.error('Error posting article:', error);
        alert('Error posting article: ' + error.message);
      });
  };

  // Render the article submission form.
  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a New Article</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title} // Controlled input linked to title state.
          onChange={e => setTitle(e.target.value)} // Update title on change.
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content} // Controlled textarea linked to content state.
          onChange={e => setContent(e.target.value)} // Update content on change.
          required
        />
      </div>
      <button type="submit">Submit Article</button>
    </form>
  );
};

export default ArticleForm;
