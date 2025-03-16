import React from 'react';

// Component to display a list of articles
const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No articles available.</p>;
  }
  
  return (
    <div>
      {articles.map(article => (
        <div key={article.id} className="article">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;