import React from 'react';
import { authActionNames } from '../../store/auth';
import { Field, Form } from 'react-final-form';
import { FormLine, FormField, FormError, FormSubmitBtn } from '../../components/form';
import MakeAsync from '../../components/common/make-async';
import { isRequired } from '../../utils';
import { Spacer } from '../../components/common';

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfim: '',
};
const validate = ({ password, passwordConfim }) => {
  const errors = {};
  if (password !== passwordConfim) {
    errors.passwordConfim = 'Passwords do not match';
  }
  return errors;
};

const SignUpForm = () => {
  return (
    <MakeAsync
      start={authActionNames.REGISTER_USER}
      resolve={authActionNames.REGISTER_USER_SUCCESS}
      reject={authActionNames.REGISTER_USER_ERROR}
    >
      {onSubmit => (
        <Form
          {...{
            onSubmit,
            initialValues,
            validate,
          }}
          render={({ handleSubmit, submitting, submitError }) => {
            return (
              <>
                <Spacer height={10} />
                <form onSubmit={handleSubmit} noValidate>
                  <FormLine>
                    <Field
                      name="name"
                      type="text"
                      validate={isRequired}
                      label="Name"
                      render={FormField}
                      disabled={submitting}
                    />
                  </FormLine>
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
                  <FormLine>
                    <Field
                      name="passwordConfim"
                      type="password"
                      validate={isRequired}
                      label="Confirm password"
                      render={FormField}
                      disabled={submitting}
                    />
                  </FormLine>
                  <FormSubmitBtn submitting={submitting}>Sign up</FormSubmitBtn>
                  <FormError submitError={submitError} />
                </form>
              </>
            );
          }}
        />
      )}
    </MakeAsync>
  );
};

export default SignUpForm;
