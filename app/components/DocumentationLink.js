import React from 'react';
import ExternalLink from './ExternalLink';

const DocumentationLink = ({ link, children }) => {
  const [page, anchor] = link.split('#');
  return (
    <ExternalLink href={'https://cu3po42.gitbooks.io/keysave/content/' + page + '.html#' + anchor}>{children}</ExternalLink>
  );
};

export default DocumentationLink;
