import { useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const inputData = [
  { name: 'firstName', type: 'text', title: 'First Name' },
  { name: 'phone', type: 'tel', title: 'Phone number' },
  { name: 'email', type: 'email', title: 'Email' },
  { name: 'password', type: 'password', title: 'Password' },
]
const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  phone: Yup.string().phone().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const initialValues = {
  firstName: "",
  phone: "",
  email: "",
  password: "",
};

const RegisterFormik = () => {
  const [loading, setLoading] = useState(false);
  const renderError = (message: string) => <p className="input-error">{message}</p>;
  const onSubmit = async (data: { [field: string]: string }): Promise<boolean> => {
    setLoading(true);
    await (new Promise((resolve => setTimeout(() => resolve(''), 2000))));
    return fetch('http://localhost:1337/api/clients', {
      body: JSON.stringify({data}),
      mode: 'cors',
      headers: { "Content-Type": "application/json"},
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return true;
      })
      .catch(() => false)
      .finally(() => setLoading(false));
  };

  return (
    <Main
      meta={
        <Meta
          title="Register page title"
          description="Register page description"
        />
      }
    >
      <div className="form">
        <h2 className="form__title">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
        >
          {({ errors, isValid }) => (
            <Form className={`form__area ${loading ? 'form__area--loading' : ''}`}>
              {inputData.map((({name, type, title}) => (
                <div key={name} className={`form__row ${errors[name] ? 'form__row--error' : ''}`}>
                  <label className="label" htmlFor={name}>{title}</label>
                  <div className="control">
                    <Field name={name} type={type} />
                    <ErrorMessage name={name} render={renderError} />
                  </div>
                </div>
              )))}
              <div className="form__button-row">
                <button className="form__button" disabled={!isValid}>Register</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Main>
  );
}

export default RegisterFormik;
