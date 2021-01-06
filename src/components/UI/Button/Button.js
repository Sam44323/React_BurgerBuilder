import React from 'react';

import classes from './Button.css';

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btntype]].join(' ')}
    onClick={props.clicked && props.clicked}
    {...props}
  >
    {props.children}
  </button>
);

export default button;
