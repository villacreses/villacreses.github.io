import React from 'react';
import ResumeItem from './ResumeItem';

const ResumeSection = props => (
  <>
    <section id={props.id}>
      {props.heading && <h2 id="section-heading">{props.heading}</h2>}
      {props.items.map(item => <ResumeItem {...item} />)}
    </section>
    {!props.hideHr && <hr />}
  </>
);



export default ResumeSection;
