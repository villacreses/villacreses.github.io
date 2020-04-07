import React from 'react';
import SchemaRenderer from '../SchemaRenderer';
import ResumeItem from './ResumeItem';
import SkillIcons from '../skill-icons';

const ResumeSection = props => (
  <>
    <section id={props.id}>
      <SchemaRenderer
        schema={props.schema}
        componentMap={{
          h2: ({ text, ...props }) => <h2 {...props}>{text}</h2>,
          div: props => <div {...props} />,
          ResumeItem,
          SkillIcons,
        }}
      />
    </section>
    {!props.hideHr && <hr />}
  </>
);



export default ResumeSection;
