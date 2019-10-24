import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../store/auth';
import { useForm, useField } from 'react-final-form-hooks';
import { Field, Form } from 'react-final-form';
import { Input } from '@material-ui/core';

const initialValues = {
  email: '',
};

const validate = (...args) => {
  console.log('TCL: validate -> args', args);
  return {};
};

const SignUp = props => {
  const onSubmit = useCallback((...args) => {
    console.log('TCL: onSubmit -> args', args);
  }, []);
  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit,
    validate,
  });
  const email = useField('email', form);
  console.log('TCL: email', email);

  return (
    <form onSubmit={handleSubmit}>
      <Input {...email.input} />
      <button 
        type="submit"
        disabled={submitting || pristine}
      >sub</button>
    </form>
  );
};

export default connect(
  state => ({ state }),
  { ...authActions }
)(SignUp);
