import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../ParseInitialize';
import logo from'./Branch-logo.jpg';
import { AuthContext } from '../context/AuthContext';

 const Login = () => {
    const { currentAgent, updateCurrentAgent } = useContext(AuthContext);
    console.log("🚀 ~ Login ~ currentAgent:", currentAgent)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await Parse.User.logIn(email, password);
            if (!email) {
                alert('Please enter a valid email');
            }
            if (!password) {
                alert('Password cannot be empty');
            }
            if (!user) {
                throw new Error('Invalid email or password');
            }
            console.log("🚀 ~ handleLogin ~ user:", user)
            console.log("Log in succesfully")
            await updateCurrentAgent();
            navigate('/chatroom');
        } catch (error) {
            alert(error.message);
            console.log("🚀 ~ handleLogin ~ error:", error);
            setEmail("");
            setPassword("");
        }
    }


    return (
        <div className='formContainer'>
            <div className='formWrapper'>
            <img src={logo} alt='Logo' className='img'/>
                {/* <span className='logo'>
                </span> */}
                <span className='title'>Agent Portal</span>
                <form onSubmit={handleLogin}>
                    <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    <button type='submit'>Sign in</button>
                </form>
            </div>
        </div>
    );
 }

 export default Login;