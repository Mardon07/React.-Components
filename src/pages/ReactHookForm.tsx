import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validation';
import { FormData, getData } from '../store/form/formSlice';
import { useNavigate } from 'react-router';
import { RootState } from '../store';
export interface IReactHookFormProps {}

interface Data {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean | undefined;
  picture?: FileList | undefined;
  country: string;
}

export default function ReactHookForm() {
  const data = useSelector((state: RootState) => state.country.countries);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });
  const onSubmit: SubmitHandler<Data> = (data) => {
    const pictureFile = data.picture?.[0];

    if (pictureFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const base64String = fileReader.result?.toString().split(',')[1];
        dispatch(getData({ ...data, picture: base64String } as FormData));
      };
      fileReader.readAsDataURL(pictureFile);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input {...register('name')} />
        {errors.name && (
          <span style={{ color: 'red' }}>{errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" {...register('age')} />
        {errors.age && (
          <span style={{ color: 'red' }}>{errors.age.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && (
          <span style={{ color: 'red' }}>{errors.email.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div>
        <label>Gender:</label>
        <label>
          <input type="radio" value="male" {...register('gender')} /> Male
        </label>
        <label>
          <input type="radio" value="female" {...register('gender')} /> Female
        </label>
        {errors.gender && (
          <span style={{ color: 'red' }}>{errors.gender.message}</span>
        )}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('acceptTerms')} /> Accept Terms &
          Conditions
        </label>
        {errors.acceptTerms && (
          <span style={{ color: 'red' }}>{errors.acceptTerms.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          {...register('picture')}
          id="picture"
          accept=".png, .jpeg"
        />
        {errors.picture && (
          <span style={{ color: 'red' }}>{errors.picture.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" {...register('country')}>
          <option value="">Select Country</option>
          {data.map((elem, index) => (
            <option key={index} value={elem.name}>
              {elem.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <span style={{ color: 'red' }}>{errors.country.message}</span>
        )}
      </div>

      <button disabled={Object.keys(errors).length > 0} type="submit">
        Submit
      </button>
    </form>
  );
}
