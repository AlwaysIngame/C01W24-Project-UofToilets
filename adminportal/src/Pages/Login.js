//Import statements
import React, { useState, } from 'react';
import './Login.css';
import { SERVER_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

function LoginPage(){

  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    //if (formJson.username === "" || formJson.password === "") {
    //  setLoginError(true);
    // setErrorMessage("*Username and Password cannot be blank")
    //} //*Incorrect Username or Password

    /* -- Call and validate login -- Uncomment when confirmed working
    try {
      const loginRes = await fetch(`${SERVER_URL}/loginAdmin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: formJson.username,
            password: formJson.password,
        })
      })
    
      const loginBody = await loginRes.json();

      if (loginRes.ok) {
        setErrorMessage("");
        localStorage.setItem("accessToken", loginBody.token)
        //props.navigation.navigate("Tabs");
        navigate('/admin/dashboard');

      } else {
        setErrorMessage(loginBody.error);
      }

    } catch (error) {
      setErrorMessage("Login failure: " + error);
    }
    */
    
    //For now, we navigate, remove once validation is working
    navigate('/admin/dashboard')

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


