import { withFormik } from 'formik';

export const validation = (values /*, dispatch */) => {
  return withFormik({
    mapPropsToValues: () => ({ email: '', name : '', password: '', confirmPassword : '' }),
    // Custom sync validation
    validate: values => {
      let errors = {};
      const requiredFields = [
        'name',
        'email',
        'password',
        'confirmPassword'
      ]
      requiredFields.forEach(field => {
        if (!values[field]) {
          errors[field] = 'Required'
        }
      })
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address'
      }
      if (
        values.password &&
        values.password.length < 8
      ) {
        errors.password = 'password should be minimum 8 characters'
      }
      console.log(values,'s')
      if (
        values.password && values.confirmPassword &&
        values.password !== values.confirmPassword
      ) {
        errors.confirmPassword = 'password mismatch'
      }
      return errors;
    },
  
    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
  
    displayName: 'BasicForm', // helps with React DevTools
  })

}

