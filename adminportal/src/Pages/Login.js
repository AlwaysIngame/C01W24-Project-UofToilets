//Import statements
import React, { useState, } from 'react';
import './Login.css';

function LoginPage(){

  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e){
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.username === "" || formJson.password === "") {
      setLoginError(true);
      setErrorMessage("*Username and Password cannot be blank")
    } //Incorrect Username or password
  };


  return(
    <div className='background'>
      <div className='loginContainer'>
        <h1 className='pageTitle'>GoHere Portal</h1>
        <form method='post' onSubmit={handleSubmit} className='loginForm'>
          <input className='textInput' name="username" placeholder="Username"/>
          <input className='textInput' name="password" type="password" placeholder='Password'/>
          {loginError && (<p className='errorMsg'>{errorMessage}</p>)}          
          <button className='loginButton' type='submit'>Login</button>
        </form> 
      </div>
    </div>
  );
};

export default LoginPage;


