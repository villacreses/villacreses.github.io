import React from 'react';

const BulletList = data => (
  <div>
    {data.opener && <label htmlFor={data.id}>{data.opener}</label>}
    <ul id={data.id}>
      {data.items.map(({ id, href, text }) => (
        <li key={id}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          ) : (
            <span>{text}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default BulletList;
