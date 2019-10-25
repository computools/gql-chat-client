import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    flex: 1,
    margin: '5px 0',
  },
});

const FormField = ({ input, meta, ...rest }) => {
  const { touched, error, submitError } = meta;
  console.log('TCL: FormField -> input', input);
  console.log('TCL: FormField -> meta', meta);
  console.log('TCL: FormField -> rest', rest);
  const classes = useStyles();
  const hasError = touched && error;
  const errorText = error || submitError;
  // const errorText = errors[input.name];
  // const hasError = !!(touched[input.name] && errorText);

  return (
    <TextField
      className={classes.root}
      helperText={hasError ? errorText : ''}
      // error={hasError}
      {...input}
      {...rest}
    />
  );
};

export default FormField;
