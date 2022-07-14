import React from "react";
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const NewPayee = () => {
    const date = new Date();
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        extraNotes: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        console.log(data);
        event.preventDefault();
        try {
            const url = "/api/payees/";
            const { data: res } = await axios.post(url, data);
            setMessage(res.message);
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setMessage(error.response.data.message);
            }
        }
    };
    return (
        <section className="container">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <h1 className="opacity">New Payee</h1>
                    <form onSubmit={handleSubmit}>
                        {message && <div>{message}</div>}
                        <input onChange={handleChange} name="name" type="text" placeholder="NAME" value={data.name}/>
                        <input onChange={handleChange} name="email" type="text" placeholder="EMAIL" value={data.email}/>
                        <input onChange={handleChange} name="phoneNumber" type="text" placeholder="PHONE NUMBER" value={data.phoneNumber}/>
                        <input onChange={handleChange} name="extraNotes" type="string" placeholder="EXTRA NOTES" value={data.extraNotes}/>
                        <button type="submit" className="opacity">ADD</button>
                    </form>
                </div>
                <div className="circle circle-two"></div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    )
}

export default NewPayee;
