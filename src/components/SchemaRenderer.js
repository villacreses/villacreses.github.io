import React from 'react';

const SchemaRenderer = ({ componentMap, schema, wrapper }) => (
  schema.map(({ id, component, props, wrapperProps }) => {
    const Component = componentMap[component] || componentMap.default;
    const Wrapper = componentMap[wrapper];

    if (!Component) {
      return null;
    }

    if (Wrapper) {
      return (
        <Wrapper key={id} {...wrapperProps}>
          <Component id={id} {...props} />
        </Wrapper>
      );
    }
    
    return <Component key={id} id={id} {...props} />;
  })
);

SchemaRenderer.defaultProps = {
  componentMap: {},
  schema: [],
};

export default SchemaRenderer;
