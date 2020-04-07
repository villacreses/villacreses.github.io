import React from 'react';

const BulletList = data => (
  <div>
    <label htmlFor={data.key}>{data.opener}</label>
    <ul id={data.key}>
      {data.items.map(({ key, href, text }) => (
        <li key={key}>
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
