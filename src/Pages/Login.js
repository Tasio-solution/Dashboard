import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom'
import React, { useState } from "react";

function Login({logado=false}) {
  const [isActive, setIsActive] = useState(false);
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
        console.log(response.data.msg);
      }
    });
  };

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/Register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response.data.msg);
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

  const show_hide_password = (target) =>{
    let showHide = document.getElementById('password-control')
    var input = document.getElementById('password-input');
    if (input.getAttribute('type') == 'password') { 
      setIsActive(current => !current);
      input.setAttribute('type', 'text');
    } else {
      setIsActive(current => !current);
      input.setAttribute('type', 'password');
    }
    return false;
  }

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
            <h2>LOGIN</h2>
            <Formik
              initialValues={{}}
              onSubmit={handleLogin}
              validationSchema={validationsLogin}
            >
              <Form className="LoginForm">
                <div className="inputBx">
                  <Field name="email" type='username' className="inputBox" autoComplete="username" />
                  <span className="spanInput" >Email/username</span>
                  <i className="fas fa-user-circle"></i>
                  <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                  />
                </div>
                <div className="inputBx password">
                  <Field name="password" type='password' className="inputBox" id="password-input" />
                  <span className="spanInput">password</span>
                  <a href="#" className={isActive ? 'password-control view' : 'password-control'} onClick={event => show_hide_password(event, 100)}></a>
                  <i className="fas fa-key"></i>
                  <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                  />
                </div>
                {/* <label className="remember">
                  <input type="checkbox" /> Remember me
                </label> */}
                <div className="inputBx">
                  <input  type="submit" value="login" />
                </div>
              </Form>
            </Formik>
            <p>Forgot password? {!logado && <Link to="/Register">Click Here</Link>}</p>
            <p>Don't have an account {!logado && <Link to="/Register">Sign up</Link>}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;