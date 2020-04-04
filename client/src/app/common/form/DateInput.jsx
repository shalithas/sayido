import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Form, Label } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import toDate from 'date-fns/toDate';

const DateInput = ({
  input: { value, onChange, onBlur },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <ReactDatePicker
        {...rest}
        placeholderText={placeholder}
        selected={
          value
            ? Object.prototype.toString.call(value) !== '[object Date]'
              ? toDate(value)
              : value
            : null
        }
        onChange={onChange}
        onBlur={onBlur}
        onChangeRaw={e => e.preventDefault()}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
