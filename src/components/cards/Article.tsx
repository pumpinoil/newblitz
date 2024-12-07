import React from 'react';

interface ArticleProps {
  content?: string;
  title?: string;
}

const Article: React.FC<ArticleProps> = ({ content, title }) => {
  return (
    <article className="prose prose-lg prose-invert p-4">
      <h1>{title || 'Magickal Design Principles'}</h1>
      <div dangerouslySetInnerHTML={{ __html: content || '<p>Explore the foundational concepts behind creating stunning and interactive designs...</p>' }} />
    </article>
  );
};

export default Article;