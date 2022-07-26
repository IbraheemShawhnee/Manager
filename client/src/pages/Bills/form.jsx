import React, { useState } from "react";
import axios from "axios";
const NewBill = () => {
    document.title = "Manager - New Bill";
    const date = new Date();
    const [data, setData] = useState({
        date: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
        value: 0,
        description: "",
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
            const url = "/api/bills/";
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
                    <h1 className="opacity">New Bill</h1>
                    <form onSubmit={handleSubmit}>
                        {message && <div>{message}</div>}
                        <input onChange={handleChange} name="date" type="date" placeholder="DATE" value={data.date} />
                        <input onChange={handleChange} name="value" type="text" placeholder="VALUE" value={data.value} />
                        <input onChange={handleChange} name="description" type="text" placeholder="DESCRIPTION" value={data.description} />
                        <input onChange={handleChange} name="extraNotes" type="string" placeholder="EXTRA NOTES" value={data.extraNotes} />
                        <button type="submit" className="opacity">ADD</button>
                    </form>
                </div>
                <div className="circle circle-two"></div>
            </div>
            <div className="theme-btn-container"></div>
        </section>
    )
}

export default NewBill;
