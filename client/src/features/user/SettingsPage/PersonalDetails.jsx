import React, { Component, Fragment } from 'react';
import { Form, reduxForm, Field } from 'redux-form';
import { Paper, withStyles, Grid } from '@material-ui/core';
import DatePicker from '../../../app/common/materialForm/DatePicker';
import TextInput from '../../../app/common/materialForm/TextInput';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(3),
  },
  field: {
    width: '90%',
  },
  divider: {},
});

class PersonalDetails extends Component {
  onSubmit = (formData) => {
    console.log(formData);
  };

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <Fragment>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Paper className={classes.paper} elevation={3}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <Field
                  name='name'
                  component={TextInput}
                  className={classes.field}
                  id='standard-basic'
                  label='Your name'
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Field
                  component={TextInput}
                  name='partnerName'
                  className={classes.field}
                  id='standard-basic'
                  label="Your partner's name"
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper} elevation={3}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <Field
                  component={DatePicker}
                  disableToolbar
                  variant='inline'
                  margin='normal'
                  id='date-picker-inline'
                  label='Date picker inline'
                  name='date'
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Field
                  component={TextInput}
                  name='location'
                  className={classes.field}
                  id='standard-basic'
                  label="Location"
                />
              </Grid>
            </Grid>
          </Paper>
        </Form>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(
  reduxForm({ form: 'personalDetailsForm' })(PersonalDetails)
);
