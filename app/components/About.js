import React from 'react';
import Paper from 'material-ui/lib/paper';
import ExternalLink from './ExternalLink';
import styles from './About.module.scss';
import { version } from '../../package.json';

const About = () => (
  <Paper className={styles.paper}>
    <h1>KeySAV<sup>e</sup></h1>
    <h3>Version {version}</h3>
    <p>
      If you encounter any issues with KeySAV<sup>e</sup>, have any suggestions or wishes,
      please <ExternalLink href="https://github.com/Cu3PO42/KeySAVe/issues">create an issue on GitHub</ExternalLink>,
      contact me (Cu3PO42) on <a href="irc://irc.synirc.net:6667">synIRC</a>,
      message me on Twitter (<ExternalLink href="https://twitter.com/Cu3PO42">@Cu3PO42</ExternalLink>)
      or send me an <a href="mailto:cu3po42@gmail.com">e-mail</a>.
      Any and all feedback is appreciated. If you report an issue, make sure to
      include your operating system, the version of KeySAV<sup>e</sup> you're on
      and how to reproduce the issue.
    </p>
    <h2>Thanks</h2>
    <p>
      The original decryption exploits were devised by Kaphotics and OmegaDonut and are used with permission.
      Without them, this wouldn't have happened. Thank you for your hard work!
    </p>
    <p>
      The included sprites were originally ripped by <ExternalLink href="http://www.pkparaiso.com">pkparaiso.com</ExternalLink> and only modified by me.
    </p>
    <p>
      I would also like to thank everyone who helped me in the development of KeySAV<sup>e</sup> by testing,
      providind feedback, giving me ideas for features I could implement and by helping me collect
      localization data.
    </p>
    <h2>Documentation</h2>
    <p>
      The documentation can be found <ExternalLink href="https://cu3po42.gitbooks.io/keysave/content/">here</ExternalLink>.
    </p>
    <h2>Copyright</h2>
    <p>
      KeySAV<sup>e</sup> itself is written by Cu3PO42, other code is used under the terms of the respective licenses.
      The Pokémon character names, stats, sprites and other data is Copyright 2002-2016 Pokémon, Copyright 1995-2016 Nintendo/Creatures Inc./GAME FREAK Inc.
    </p>
    <h2>Libraries</h2>
    <p>
      The following libraries are used in KeySAV<sup>e</sup> that I would like to highlight specifically:
    </p>
    <ul>
      <li><ExternalLink href="https://npmjs.com/package/KeySAVCoreJS">KeySAVCoreJS</ExternalLink> by Cu3PO42 - KeySAVCoreJS does the actual dumping and decryption. Created specifically for use in KeySAV<sup>e</sup>.</li>
      <li><ExternalLink href="https://electron.atom.io">Electron</ExternalLink> by GitHub - The framework used to create a desktop application with web technologies.</li>
      <li><ExternalLink href="https://facebook.github.io/react">React</ExternalLink> by Facebook - The view library.</li>
      <li><ExternalLink href="https://redux.js.org">Redux</ExternalLink> by Dan Abramov - A great library to manage application state.</li>
      <li><ExternalLink href="https://material-ui.com">Material UI</ExternalLink> by Call-Em-All - The library providing the interface components.</li>
      <li><ExternalLink href="https://babeljs.io">Babel</ExternalLink> - Allowing me to use modern JS today.</li>
    </ul>
  </Paper>
);
export default About;
