import React from 'react';
import SchemaRenderer from '../SchemaRenderer';
import ResumeItem from './ResumeItem';

const ResumeSection = props => (
  <>
    <section id={props.id}>
      <SchemaRenderer
        schema={props.schema}
        componentMap={{
          h2: ({ text }) => <h2>{text}</h2>,
          ResumeItem,
        }}
      />
    </section>
    {!props.hideHr && <hr />}
  </>
);



export default ResumeSection;
