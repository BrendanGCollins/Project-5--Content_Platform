// Import dependencies and components
import React, { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import './App.css';

// Define App component and initialize state for articles
function App() {
  // State to hold the list of articles
  const [articles, setArticles] = useState([]);

 // Step 3: Fetch articles from the Django API when the component mounts
 useEffect(() => {
  fetch('http://localhost:8000/api/articles/')
    .then(response => response.json())
    .then(data => setArticles(data))
    .catch(error => console.error('Error fetching articles:', error));
}, []); // Empty dependency array means this runs once on mount

// Define a callback to add a new article to the state
const addArticle = (article) => {
  setArticles([article, ...articles]);
};

// Render the component, including header, article form, and article list
return (
  <div className="App">
    <header>
      <h1>Community Publishing Platform</h1>
    </header>
    <main>
      <ArticleForm addArticle={addArticle} />
      <ArticleList articles={articles} />
    </main>
  </div>
);
}

// Export the App component so it can be used in index.js
export default App;
