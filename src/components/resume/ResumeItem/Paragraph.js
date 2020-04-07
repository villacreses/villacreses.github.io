import React from 'react';

const Paragraph = data => (
  <p>
    {data.opener && <span className="opener">{data.opener + ': '}</span>}
    <span>{data.text}</span>
  </p>
);

export default Paragraph;
