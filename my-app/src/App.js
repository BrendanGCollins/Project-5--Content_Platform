// Import dependencies and components from React.
import React, { useState, useEffect } from 'react';
// Import the ArticleList component that shows the list of articles.
import ArticleList from './components/ArticleList';
// Import the ArticleForm component that lets users create a new article.
import ArticleForm from './components/ArticleForm';
// Import CSS styles.
import './App.css';

function App() {
  // Create a state to hold the list of articles.
  const [articles, setArticles] = useState([]);
  // Create a state to hold an error message if something goes wrong.
  const [error, setError] = useState(null);

  // When the component loads, fetch articles from the Django API.
  useEffect(() => {
    fetch('http://localhost:8000/api/articles/')
      .then(response => {
        // If the response is not OK, throw an error.
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        // Convert the response to JSON.
        return response.json();
      })
      .then(data => {
        // If successful, save the articles in state.
        setArticles(data);
      })
      .catch(err => {
        // If there is an error, log it and save the error message in state.
        console.error('Error fetching articles:', err);
        setError(err.message);
      });
  }, []); // Run this effect only once when the component mounts.

  // Callback function to add a new article to the state.
  const addArticle = (article) => {
    // Prepend the new article to the articles list.
    setArticles([article, ...articles]);
  };

  // Render the main app.
  return (
    <div className="App">
      <header>
        <h1>Community Publishing Platform</h1>
      </header>
      <main>
        {/* If there is an error, display it to the user */}
        {error && <p className="error">Error: {error}</p>}
        {/* Render the form for adding a new article */}
        <ArticleForm addArticle={addArticle} />
        {/* Render the list of articles */}
        <ArticleList articles={articles} />
      </main>
    </div>
  );
}

// Export the App component so it can be used in index.js.
export default App;
