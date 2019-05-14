import React from 'react';
import './resume-item.scss';

const ResumeItem = props => {
  const {
    heading,
    subheading,
    paragraphs,
    date
  } = props;

  return (
    <div className="resume-item">
      <div className="resume-content">
        <div className="heading-wrapper">
          <h3>{heading}</h3>
          {subheading && <div className="subheading">{subheading}</div>}
        </div>
        {paragraphs.map(pData => {
          const { key, content, opener, type } = pData;

          switch (type) {
            case 'HREF_LIST':
              return (
                <div key={key}>
                  <label htmlFor={key}>{opener}</label>
                  <ul id={key}>
                    {pData.liArr.map(({ href, text }) => (
                      <li key={href}>
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
              )
            default:
              return (
                <p key={key}>
                  {opener && <span className="opener">{opener + ': '}</span>}
                  <span>{content}</span>
                </p>
              );
          }
        })}
      </div>
      <div className="resume-date">{date}</div>
    </div>
  );
};

export default ResumeItem;
