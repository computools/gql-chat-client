import React, { useCallback, useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../store/auth';
import { Field, Form } from 'react-final-form';
import { Input } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import { FormLine, FormField } from '../../components/form';

const initialValues = {
  email: '',
  password: '',
  passwordConfim: '',
};
const delay = t => new Promise(r => setTimeout(r, t));

const validate = ({ email }) => {
  console.log('TCL: validate -> email', email);
  if (email === '123') return { email: 'nope', };
};

const SignUp = props => {
  const onSubmit = useCallback(async ({ email, password, passwordConfim }) => {
    await delay(300);
    console.log('TCL: onSubmit -> args', email, password, passwordConfim);
    // if (true) {
    return { [FORM_ERROR]: 'from erorroror   incorrect...' };
    // }
  }, []);

  return (
    <>
      <Form
        {...{
          onSubmit,
          validate,
          initialValues,
        }}
        render={({ handleSubmit, submitting, pristine, submitError, errors }) => {
          return (
            <form onSubmit={handleSubmit} noValidate>
              <FormLine>
                <Field name="email" render={p => <FormField {...p} errors={errors} />} />
              </FormLine>
              <button type="submit" disabled={submitting || pristine}>
                sub
              </button>
              <span>{submitError}</span>
            </form>
          );
        }}
      />
    </>
  );
};

export default connect(
  state => ({ state }),
  { ...authActions }
)(SignUp);
