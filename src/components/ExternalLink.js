import React from 'react';

const ExternalLink = (props) => (
  <a {...props} target="_blank">{props.children}</a>
);
export default ExternalLink;
