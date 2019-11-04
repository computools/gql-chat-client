import React from 'react';
import { Button } from '@material-ui/core';
import { authActionNames } from '../../store/auth';
import { Field, Form } from 'react-final-form';
import { FormLine, FormField } from '../../components/form';
import MakeAsync from '../../components/common/make-async';
import { isRequired } from '../../utils';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  return (
    <MakeAsync
      start={authActionNames.LOG_IN_USER}
      resolve={authActionNames.LOG_IN_USER_SUCCESS}
      reject={authActionNames.LOG_IN_USER_ERROR}
    >
      {onSubmit => (
        <Form
          {...{
            onSubmit,
            initialValues,
          }}
          render={({ handleSubmit, submitting, submitError }) => {
            return (
              <form onSubmit={handleSubmit} noValidate>
                <FormLine>
                  <Field
                    name="email"
                    type="text"
                    validate={isRequired}
                    label="Email"
                    render={FormField}
                    disabled={submitting}
                  />
                </FormLine>
                <FormLine>
                  <Field
                    name="password"
                    type="password"
                    validate={isRequired}
                    label="Password"
                    render={FormField}
                    disabled={submitting}
                  />
                </FormLine>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                >
                  Login
                </Button>
                <span>{submitError}</span>
              </form>
            );
          }}
        />
      )}
    </MakeAsync>
  );
};

export default LoginForm;
