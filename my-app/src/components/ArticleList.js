import React from 'react';

// Component to display a list of articles.
// Props:
//   articles: Array of article objects.
//   onDelete: Function to call when an article needs to be deleted.
const ArticleList = ({ articles, onDelete }) => {
  // If there are no articles, display a message.
  if (!articles || articles.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <div>
      {articles.map(article => (
        <div key={article.id} className="article">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          {/* Delete button: calls onDelete with the article id */}
          <button onClick={() => onDelete(article.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
