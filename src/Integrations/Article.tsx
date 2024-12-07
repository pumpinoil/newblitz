import React from 'react';

interface ArticleProps {
  content?: string;
}

const Article: React.FC<ArticleProps> = ({ content }) => {
  return (
    <article className="prose prose-lg prose-invert p-4">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <>
          <h1>Magickal Design Principles</h1>
          <p>Explore the foundational concepts behind creating stunning and interactive designs...</p>
        </>
      )}
    </article>
  );
};

export default Article;
