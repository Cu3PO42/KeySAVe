import PropTypes from 'prop-types';
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
  children: PropTypes.node.isRequired
};
export default ExternalLink;
