import React from 'react';

import classes from './Input.css';

const inputComponent = (props) => {
  let inputElement = null;
  let validateMessage = null;

  const inputClasses = [classes.InputElement];
  if (!props.valid && props.touched) {
    inputClasses.push(classes.InputInvalid);
    validateMessage = (
      <p className={classes.ValidationError}>{props.validMessage}</p>
    );
  }

  switch (props.elementtype) {
    case 'input':
      inputElement = (
        //{...props} will contain all the props passed by the user
        <input
          className={inputClasses.join(' ')}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changeValue}
          {...props.validation}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changeValue}
          {...props.validation}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          onChange={props.changeValue}
          className={classes.Input}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onChange={props.changeValue}
          {...props.validation}
        >
          <option value={props.elementconfig.options[0].value}>
            {props.elementconfig.options[0].displayValue}
          </option>
          <option value={props.elementconfig.options[1].value}>
            {props.elementconfig.options[1].displayValue}
          </option>
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changeValue}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.elementconfig.placeholder}</label>
      {inputElement}
      {validateMessage}
    </div>
  );
};

export default inputComponent;
