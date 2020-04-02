import React from 'react';
import { Select, Form, Label } from 'semantic-ui-react';

const SelectInput = ({
  input,
  width,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        {...input}
        placeholder={placeholder}
        type={type}
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        options={options}
        multiple={multiple}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
