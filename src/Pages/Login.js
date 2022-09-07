import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';

function Login({logado=false}) {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      const page = response.data;
      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        window.location.reload();
      } else {
        alert(response.data.msg);
      }
    });
  };

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/Register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .min(5,"invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "The password must be at least 8 characters long")
      .required("The password is required"),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .min(8,"invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "The password must be at least 8 characters long")
      .required("The password is required"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords are different")
      .required("Password confirmation is mandatory"),
  });

  return (
    <section>
      <div className="box">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="container">
          <div className="form">
            <h1>LOGIN</h1>
            <Formik
              initialValues={{}}
              onSubmit={handleLogin}
              validationSchema={validationsLogin}
            >
              <Form className="LoginForm">
                <div className="inputBx">
                  <Field name="email" type='username' autoComplete="username" />
                  <span form="email">Email/username</span>
                  <i className="fas fa-user-circle"></i>
                  <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                  />
                </div>
                <div className="inputBx password">
                  <Field name="password" type='password' className="form-field" />
                  <span form="email">password</span>
                  <a href="#" className="password-control" onClick="return show_hide_password(this)" ></a>
                  <i className="fas fa-key"></i>
                  <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                  />
                </div>
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
                <div className="inputBx">
                  <input type="submit" />
                </div>
              </Form>
            </Formik><p>
            {!logado && <Link to="/Register">Register</Link>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;


