import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import RenderSignUp from './signup/signup';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SignUp = () => {
    const {isValid, setIsValid} = useContext(AuthContext)
    const {user, setUser} = useContext(AuthContext);
    const history = useHistory();
    const { expired, setExpired } = useContext(AuthContext);

    const onSubmit = async (values, actions) => {
        // console.log(values)
        const res = await axios.post("http://localhost:8000/user/signup", 
            {
                /*username: values.username,
                name: values.name,
                email: values.email,
                password: values.password,*/
                ...values,
                typeLogin: "Email"
            })
        const data = await res.data
        const accessToken = data['accessToken']
        const user = data['_doc']
        console.log(user['_id'])
        setUser({id: user['_id'], email: user['email'], username: user['username'], accessToken: accessToken})
        localStorage.setItem('user', JSON.stringify({id: user['_id'], email: user['email'], username: user['username'], name: user['name'], accessToken: accessToken}))
        localStorage.setItem('validToken', JSON.stringify({valid: true}))

        setIsValid(true);
        setExpired(false);
        // const login = await axios.get("http://localhost:8000/user/login", )
        history.push("/dashboard");

        // Reload the new page after a delay (e.g., 2 seconds)
        setTimeout(() => {
        window.location.reload();
        }, 100); 
    
    }
    // const { isLoggingIn, setIsLoggingIn } = useContext(AuthContext);
    // const isValid = JSON.parse(localStorage.getItem('validToken'))['valid']
    console.log(isValid)
    console.log(JSON.parse(localStorage.getItem('validToken'))['valid'])

    return (
    <div>
        {isValid ? 
        <div>
            <Box sx={{ display: 'flex', justifySelf: 'center', alignItems: 'center' }}>
            <CircularProgress />
            </Box>
        </div>: <RenderSignUp onSubmit={onSubmit}/>}
    </div>
    
    )
}

export default SignUp