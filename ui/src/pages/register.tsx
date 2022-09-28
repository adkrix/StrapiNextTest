import {useState, useRef, useEffect} from 'react';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const inputData = [
  { name: 'firstName', type: 'text', title: 'First Name' },
  { name: 'phone', type: 'tel', title: 'Phone number' },
  { name: 'email', type: 'email', title: 'Email' },
  { name: 'password', type: 'password', title: 'Password' },
]
const inputNames = inputData.map(({name}) => name);

const getDefaultElementError = () => inputData.reduce((acc, data) => ({ ...acc, [data.name]: false }), {});

const Register = () => {
  const [elementError, setElementError] = useState(getDefaultElementError());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  let inputs = inputNames.reduce((acc, name) => ({ ...acc, [name]: useRef(null) }), {});

  const handleSubmit = (event: { preventDefault: () => void; target: HTMLInputElement; }) => {
    event.preventDefault();
    setElementError(getDefaultElementError());

    let data = {};
    let isFormError = false;
    let errors = {};
    inputNames.forEach((name: string) => {
      const value = inputs[name].current.value;
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
  console.log('elementError', elementError, inputs);
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
            {inputData.map((({name, type, title}) => (
              <div key={name} className={`form__row ${elementError[name] ? 'form__row--error' : ''}`}>
                <label>{title}</label>
                <input name={name} type={type} ref={inputs[name]} />
              </div>
            )))}

          <div className="form__button-row">
            <button className="form__button">Register</button>
          </div>
        </form>
      </div>
    </Main>
  );
}

export default Register;
