import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { getData } from '../store/form/formSlice';
import { validationSchema } from '../validation';
export interface IUncontrollFormProps {}

export default function UncontrollForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef?.current?.value),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      country: countryRef.current?.value || '',
    };

    const file = pictureRef.current?.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const base64String = fileReader.result?.toString().split(',')[1];
        dispatch(getData({ ...formData, picture: base64String }));
      };
      fileReader.readAsDataURL(file);
    }
    navigate('/');
    console.log(formData);

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((validationErrors: Yup.ValidationError | undefined) => {
        if (validationErrors && validationErrors.inner) {
          const newErrors: Record<string, string> = {};
          validationErrors.inner.forEach((error) => {
            newErrors[error.path!] = error.message;
          });
          setErrors(newErrors);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} />
        {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} />
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password}</span>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        {errors.confirmPassword && (
          <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
        )}
      </div>

      <div>
        <label>Gender:</label>
        <label>
          <input type="radio" name="gender" value="male" ref={genderRef} /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" ref={genderRef} />{' '}
          Female
        </label>
        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" id="acceptTerms" ref={acceptTermsRef} /> Accept
          Terms & Conditions
        </label>
        {errors.acceptTerms && (
          <span style={{ color: 'red' }}>{errors.acceptTerms}</span>
        )}
      </div>

      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" id="picture" accept=".png, .jpeg" ref={pictureRef} />
        {errors.picture && (
          <span style={{ color: 'red' }}>{errors.picture}</span>
        )}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" ref={countryRef}>
          {/* You need to map over your countries data from the Redux store here */}
          <option value="">Select Country</option>
          <option value="country1">Country 1</option>
          <option value="country2">Country 2</option>
          {/* ... other countries ... */}
        </select>
        {errors.country && (
          <span style={{ color: 'red' }}>{errors.country}</span>
        )}
      </div>

      <button type="submit">Submit</button>
      {Object.keys(errors).length > 0 && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <p>Please fix the following errors before submitting the form:</p>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
