import React from "react";
import { useField } from "formik";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyForm = props => {
  const { isSubmitting, handleSubmit, login } = props;
  return (
    <form onSubmit={handleSubmit}>
      {login ? <MyTextField name="name" type="text" label="Name" /> : null}
      <MyTextField name="email" type="text" label="Email" />
      <MyTextField name="password" type="password" label="Password" />
      {login ? (
        <MyTextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
        />
      ) : null}
      <button type="submit" disabled={isSubmitting}>
        Create Account
      </button>
    </form>
  );
};

export default MyForm;
