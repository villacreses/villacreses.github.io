import React from 'react';

import BulletList from './BulletList';
import Paragraph from './Paragraph';

import './resume-item.scss';

const ResumeItem = props => (
  <div className="ResumeItem">
    <div className="resume-main">
      {props.heading && (
        <div className="heading-wrapper">
          <h3>{props.heading}</h3>
          {props.subheading && (
            <div className="subheading">{props.subheading}</div>
          )}
        </div>
      )}
      {props.description && props.description.map((paragraph, idx) => (
        <Paragraph key={`${props.id}-desc-${idx}`} {...paragraph} />)
      )}
      {props.impact && <BulletList id={`${props.id}-impact`} {...props.impact} />}
    </div>
    {props.date && <div className="resume-date">{props.date}</div>}
  </div>
);

export default ResumeItem;
