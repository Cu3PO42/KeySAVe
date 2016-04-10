import React from 'react';
import { remote } from 'electron';
const { openExternal } = remote.require('electron').shell;

function openLink(e) {
  e.preventDefault();
  openExternal(e.target.href);
}

const ExternalLink = (props) => (
  <a {...props} onClick={openLink}>{props.children}</a>
);
ExternalLink.propTypes = {
  children: React.PropTypes.node.isRequireds
};
export default ExternalLink;
