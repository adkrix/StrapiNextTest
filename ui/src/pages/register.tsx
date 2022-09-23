import { useState } from 'react';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const getDefaultElementError = () => ({
  firstName: false,
  email: false,
  phone: false,
  password: false,
});

const Register = () => {
  const [elementError, setElementError] = useState(getDefaultElementError());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; target: HTMLInputElement; }) => {
    event.preventDefault();
    setElementError(getDefaultElementError());

    let data = {};
    let isFormError = false;
    let errors = {};
    ['firstName', 'phone', 'email', 'password'].forEach((name: string) => {
      const value = event.target.querySelector(`[name=${name}]`).value;
      if (!value) {
        isFormError = true;
        errors = {...errors, [name]: true };
      } else {
        data[name] = value;
      }
    });
    setElementError(errors)

    if (isFormError) {
      return;
    }

    setLoading(true);
    fetch('http://localhost:1337/api/clients', {
      body: JSON.stringify({data}),
      mode: 'cors',
      headers: { "Content-Type": "application/json"},
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubmitted(true);
      }).finally(() => setLoading(false))
  }
  console.log('elementError', elementError)
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
          <form className={`form__area ${loading ? 'form__area--loading' : ''} ${submitted ? 'form__area--submitted' : ''}`}
              onSubmit={handleSubmit}>
          <div className={`form__row ${elementError.firstName ? 'form__row--error' : ''}`}>
            <label>First Name</label>
            <input name="firstName" type="text" />
          </div>
          <div className={`form__row ${elementError.phone ? 'form__row--error' : ''}`}>
            <label>Phone number</label>
            <input name="phone" type="tel" />
          </div>
          <div className={`form__row ${elementError.email ? 'form__row--error' : ''}`}>
            <label>Email</label>
            <input name="email"  type="email" />
          </div>
          <div className={`form__row ${elementError.password ? 'form__row--error' : ''}`}>
            <label>Password</label>
            <input name="password" type="password" />
          </div>
          <div className="form__button-row">
            <button className="form__button">Register</button>
          </div>
        </form>
      </div>
    </Main>
  );
}

export default Register;
