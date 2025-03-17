// src/App.js
import React, { useState, useEffect } from 'react';
import ArticleForm from './components/ArticleForm';
import ArticleList from './components/ArticleList';
import SearchForm from './SearchForm';
import './App.css';

function App() {
  // State to hold the list of articles.
  const [articles, setArticles] = useState([]);
  // State to hold an error message if something goes wrong.
  const [error, setError] = useState(null);

  // Fetch articles from the Django API when the component mounts.
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/')
      .then((response) => {
        // If the response is not OK, throw an error.
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        // Convert the response to JSON.
        return response.json();
      })
      .then((data) => {
        // If successful, save the articles in state.
        setArticles(data);
      })
      .catch((err) => {
        // Log any errors and set the error state.
        console.error('Error fetching articles:', err);
        setError(err.message);
      });
  }, []);

  // Callback function to add a new article to the state.
  const addArticle = (article) => {
    setArticles([article, ...articles]);
  };

  // Callback function to delete an article.
  const deleteArticle = (id) => {
    fetch(`http://127.0.0.1:8000/api/articles/${id}/delete/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete article');
        }
        // Remove the article from state.
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        );
      })
      .catch((error) => {
        alert('Error deleting article: ' + error.message);
      });
  };

  // Callback function to handle search filters.
  const handleSearch = (filters) => {
    const { title, category } = filters;
    let url = 'http://127.0.0.1:8000/api/articles/search/?';
    if (title) url += `title=${encodeURIComponent(title)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then((data) => setArticles(data))
      .catch((error) => alert('Search error: ' + error.message));
  };

  return (
    <div className="App">
      <header>
        <h1>Community Publishing Platform</h1>
      </header>
      <main>
        {/* Render the form for creating a new article */}
        <ArticleForm addArticle={addArticle} />
        {/* Render the search form for filtering articles */}
        <SearchForm onSearch={handleSearch} />
        {/* Display an error message if one exists */}
        {error && <p className="error">Error: {error}</p>}
        {/* Render the list of articles and pass the delete function */}
        <ArticleList articles={articles} onDelete={deleteArticle} />
      </main>
    </div>
  );
}

export default App;
