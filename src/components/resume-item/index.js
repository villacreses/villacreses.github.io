import React from 'react';
import SchemaRenderer from '../SchemaRenderer';

const BulletList = data => (
  <div>
    <label htmlFor={data.key}>{data.opener}</label>
    <ul id={data.key}>
      {data.liArr.map(({ key, href, text }) => (
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

const Paragraph = data => (
  <p>
    {data.opener && <span className="opener">{data.opener + ': '}</span>}
    <span>{data.content}</span>
  </p>
);

const map = {
  HREF_LIST: BulletList
};

const ResumeItem = ({ heading, subheading, paragraphs, date }) => (
  <div className="resume-item">
    <div className="resume-content">
      {heading && (
        <div className="heading-wrapper">
          <h3>{heading}</h3>
          {subheading && <div className="subheading">{subheading}</div>}
        </div>
      )}
      <SchemaRenderer
        schema={paragraphs}
        componentMap={{
          BulletList,
          Paragraph,
          default: Paragraph
        }}
      />
    </div>
    <div className="resume-date">{date}</div>
  </div>
);

export default ResumeItem;
