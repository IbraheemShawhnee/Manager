import React from "react";
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: ""
    });

    const [available, setAvailable] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const checkUsername = async ({ currentTarget: usernameInput }) => {
        const username = { username: usernameInput.value }
        if (username.username.length) {
            const url = "/api/checkUsername";
            const { data: res } = await axios.post(url, username);
            console.log(res);
            if (res.available) {
                console.log("a7a")
                setMessage("");
                setAvailable(true);
            }
            else {
                setAvailable(false);
                setMessage("Username already taken");
            }
        }
    };

    function validate() {
        if (
            data.name &&
            (data.username.length && available) &&
            data.password.length &&
            (data.password === data.confirmPassword)
        ) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const url = "/api/register";
                const { data: res } = await axios.post(url, data);
                setMessage(res.message);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setMessage(error.response.data.message);
                }
            }
        }
    };
    return (
        <section className="container">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <h1 className="opacity">New Worker</h1>
                    <form onSubmit={handleSubmit}>
                        {message && <div>{message}</div>}
                        <input onChange={handleChange} name="name" type="text" placeholder="FULL NAME" />
                        <input onChange={handleChange} name="username" type="text" placeholder="USERNAME" onBlur={checkUsername}/>
                        <input onChange={handleChange} name="password" type="password" placeholder="PASSWORD" />
                        <input onChange={handleChange} name="confirmPassword" type="password" placeholder="CONFIRM PASSWORD" />
                        <input onChange={handleChange} name="email" type="text" placeholder="E-MAIL" />
                        <input onChange={handleChange} name="phoneNumber" type="text" placeholder="PHONE NUMBER" />
                        <button type="submit" className="opacity">Register</button>
                    </form>
                </div>
                <div className="circle circle-two"></div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    )
}

export default Register;
