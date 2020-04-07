import React from 'react';

const SchemaRenderer = ({ componentMap, schema }) => (
  schema.map(({ id, component, props, wrapper, wrapperProps }) => {
    const Component = componentMap[component] || componentMap.default;
    const Wrapper = componentMap[wrapper];

    if (!Component) {
      return null;
    }

    if (Wrapper) {
      return (
        <Wrapper {...wrapperProps}>
          <Component key={id} id={id} {...props} />
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
