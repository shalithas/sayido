import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return <TextField {...input} placeholder={placeholder} type={type} {...rest} error={error} />;
};

export default TextInput;
