import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createWorker, findWorker, updateWorker } from "../../features/Workers/workersSlice";

import axios from "axios";
import "./index.css";
import Loading from "../../components/Loading";

const WorkerForm = () => {
    let { id } = useParams();
    document.title = id ? "Manager - Edit Worker" : "Manager - New Worker";
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: ""
    });
    const [message1, setMessage] = useState("");
    const [error1, setError] = useState(false);
    const [available, setAvailable] = useState(false);

    const dispatch = useDispatch();

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
                setMessage("");
                setAvailable(true);
            }
            else {
                setAvailable(false);
                setMessage("Username already taken");
            }
        }
    };
    const checkPassword = () => {
        if (data.password === data.confirmPassword) {
            setMessage("");
            return true;
        }
        else {
            setMessage("Password feilds are not the same!");
            return false;
        }
    }
    function validate() {
        if (
            data.name &&
            (data.username.length && available) &&
            data.password.length
            // && checkPassword()
        ) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (id) {
            dispatch(findWorker(id)).then(({ payload: { worker: worker } }) => {
                setData({
                    name: worker.name,
                    email: worker.email,
                    phoneNumber: worker.phoneNumber
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                setError(true);
                return console.log(error);
            })
        }
    }, [])
    const { message, error, loading } = useSelector((state) => state.workers);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (id) {
            dispatch(updateWorker({
                id,
                data: {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber
                }
            }
            ));
        } else {
            if (validate()) {
                dispatch(createWorker(data))
            }
            else {
                setMessage("Double Check your inputs!");
            }
        }
    };
    return (
        <>
            {loading && <Loading />}
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <h1 className="opacity">{id && data ? `Edit - ${data.name}` : "New Worker"}</h1>
                        {message && <div id="msg">{message}</div>}
                        {/* {error && <div id="msg">{error}</div>} */}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input onChange={handleChange} name="name" type="text" placeholder="Full Name" value={data.name} />
                            {!id && <>
                                <input onChange={handleChange} name="username" type="text" placeholder="Username" onBlur={checkUsername} />
                                <input onChange={handleChange} name="password" type="password" placeholder="Password" />
                                <input onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm Password" onBlur={checkPassword} />
                            </>}
                            <input onChange={handleChange} name="email" type="text" placeholder="E-Mail" value={data.email} />
                            <input onChange={handleChange} name="phoneNumber" type="text" placeholder="Phone Number" value={data.phoneNumber} />
                            <button type="submit" className="opacity">{id ? "Edit" : "Add"}</button>
                        </form>
                    </div>
                    <div className="circle circle-two"></div>
                </div>
                <div className="theme-btn-container"></div>
            </section>
        </>
    )
}

export default WorkerForm;
