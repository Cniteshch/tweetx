
import { withFormik } from 'formik';
import MyForm from '../shared/form'

const login = withFormik({
  mapPropsToValues: () => ({ email: '',  password: ''}),
  // Custom sync validation
  validate: values => {
    let errors = {};
    const requiredFields = [
      'email',
      'password'
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
   
    return errors;
  },

  handleSubmit: (values, props) => {
    setTimeout(() => {
      props.props.clickFunction(values)
      props.setSubmitting(false);
    }, 1000);
  },

  displayName: 'Login', // helps with React DevTools
})

const MyEnhancedForm =  login(MyForm);

export default MyEnhancedForm;