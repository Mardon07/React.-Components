import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  gender: Yup.string().required('Gender is required'),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
  picture: Yup.mixed()
    .test(
      'fileSize',
      'File size is too large',
      (value) => value && value?.size <= 1024 * 1024
    )
    .test(
      'fileType',
      'Invalid file type',
      (value) => value && ['image/jpeg', 'image/png'].includes(value?.type)
    ),
  country: Yup.string().required('Country is required'),
});
