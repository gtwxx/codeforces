import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Register = ({setLogin}) => {
    const loginInputRef = useRef(null)
    const nameInputRef = useRef(null)
    const [error, setError] = useState('')
    const router = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const login = loginInputRef.current.value.trim()
        const password = nameInputRef.current.value.trim()
        axios.post("/api/user/register", {
            login: login,
            password: password
        }).then((response)=>{
            const jwt = response.data
            localStorage.setItem("jwt", jwt)
            setLogin(login)
            router("/");
        }).catch((error)=>{
            setError(error.response.data)
        })
    }

    return (
        <div className="registration form-box">
            <div className="header">Register</div>
            <div className="body">
                <form method="post" action="" onSubmit={handleSubmit}>
                    <input type="hidden" name="action" value="register"/>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="login">Login</label>
                        </div>
                        <div className="value">
                            <input
                                autoFocus
                                id="login"
                                name="login"
                                ref={loginInputRef}
                                onChange={() => setError(null)}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="value">
                            <input
                                autoFocus
                                id="password"
                                name="password"
                                type="password"
                                ref={nameInputRef}
                                onChange={() => setError(null)}/>
                        </div>
                    </div>
                    <div className="button-field">
                        <input type="submit" value="Register"/>
                    </div>
                    {error
                        ? <div className={'error'}>{error}</div>
                        : null
                    }
                </form>
            </div>
        </div>
    );
};

export default Register;