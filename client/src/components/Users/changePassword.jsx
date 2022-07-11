import React from "react";
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [data, setData] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const checkPassword = ()=>{
        if (data.password === data.confirmPassword){
            setMessage("");
            return true;
        }
        else{
            setMessage("Password feilds are not the same!");
            return false;
        }
    }
    function validate() {
        if (
            data.oldPassword.length && data.password.length && data.confirmPassword
            && checkPassword()
        ) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const url = "/api/changePassword";
                const { data: res } = await axios.patch(url, data);
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
                    <h1 className="opacity">Change Password</h1>
                    <form onSubmit={handleSubmit}>
                        {message && <div>{message}</div>}
                        <input onChange={handleChange} name="oldPassword" type="password" placeholder="OLD PASSWORD" />
                        <input onChange={handleChange} name="password" type="password" placeholder="NEW PASSWORD" />
                        <input onChange={handleChange} name="confirmPassword" type="password" placeholder="CONFIRM NEW PASSWORD" onBlur={checkPassword}/>
                        <button type="submit" className="opacity">Update</button>
                    </form>
                </div>
                <div className="circle circle-two"></div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    )
}

export default Register;
