import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({input: { value, onChange, onBlur },
    width,
    placeholder,
    meta: { touched, error },
    ...rest}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...rest}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        onChange={(d, v) => {
          onChange(d);
        }}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
