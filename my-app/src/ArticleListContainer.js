// ArticleListContainer.js
// Import React and hooks to manage state and side effects.
import React, { useState, useEffect } from 'react';
// Import the ArticleList component that will display the articles.
import ArticleList from './components/ArticleList';

// Define the container component that fetches articles from the API.
const ArticleListContainer = () => {
  // State to store the list of articles.
  const [articles, setArticles] = useState([]);
  // State to store any error message.
  const [error, setError] = useState(null);

  // useEffect runs once when the component mounts.
  useEffect(() => {
    // Fetch articles from the API.
    fetch('http://127.0.0.1:8000/api/articles/')
      .then(response => {
        // Check if the response is OK (status in the range 200-299).
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        // Convert the response to JSON.
        return response.json();
      })
      .then(data => {
        // Save the fetched articles in state.
        setArticles(data);
      })
      .catch(err => {
        // If there is an error, save the error message in state.
        setError(err.message);
      });
  }, []); // The empty array means this runs only once when the component mounts.

  // Render the component.
  return (
    <div>
      <h1>Articles</h1>
      {/* Display an error message if one exists */}
      {error && <p>Error: {error}</p>}
      {/* Render the ArticleList component and pass the articles */}
      <ArticleList articles={articles} />
    </div>
  );
};

// Export the component so it can be used in other parts of the app.
export default ArticleListContainer;
