import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { RootState } from '../store';
import { getData } from '../store/form/formSlice';
import { validationSchema } from '../validation/uncontrolValidate';
export interface IUncontrollFormProps {}

export default function UncontrollForm() {
  const data = useSelector((state: RootState) => state.country.countries);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRadioRef = useRef<HTMLInputElement>(null);
  const femaleRadioRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef?.current?.value),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: maleRadioRef.current?.checked
        ? maleRadioRef.current?.value
        : femaleRadioRef.current?.checked
        ? femaleRadioRef.current.value
        : '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] || null,
      country: countryRef.current?.value || '',
    };
    console.log(formData);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const file = pictureRef.current?.files?.[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const base64String = fileReader.result?.toString().split(',')[1];
          dispatch(getData({ ...formData, picture: base64String }));
        };
        fileReader.readAsDataURL(file!);
      }
      navigate('/');
    } catch (validationErrors) {
      if (Yup.ValidationError.isError(validationErrors)) {
        const newErrors: Record<string, string> = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path!] = error.message;
        });
        setErrors(newErrors);
        console.log(errors);
      }
    }
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
          <input type="radio" name="gender" value="male" ref={maleRadioRef} />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            ref={femaleRadioRef}
          />
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
        <input type="file" ref={pictureRef} />
        {errors.picture && (
          <span style={{ color: 'red' }}>{errors.picture}</span>
        )}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" ref={countryRef}>
          <option value="">Select Country</option>
          {data.map((elem, index) => (
            <option key={index} value={elem.name}>
              {elem.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <span style={{ color: 'red' }}>{errors.country}</span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
