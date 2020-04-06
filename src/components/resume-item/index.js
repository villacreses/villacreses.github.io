import React from 'react';
import './resume-item.scss';

const BulletList = data => (
  <div>
    {console.log('data', data)}
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
      <div className="heading-wrapper">
        <h3>{heading}</h3>
        {subheading && <div className="subheading">{subheading}</div>}
      </div>
      {paragraphs.map(data => {
        const Display = map[data.type] || Paragraph;
        return <Display key={data.key} {...data} />
      })}
    </div>
    <div className="resume-date">{date}</div>
  </div>
);

export default ResumeItem;
