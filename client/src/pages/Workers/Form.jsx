import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createWorker, findWorker, updateWorker } from "../../features/Workers/workersSlice";

import axios from "axios";
import "./index.css";
import Loading from "../../components/Loading";
import { setUserPermissions, setUserPassword } from "../../features/Users/userSlice";
import { UserContext } from "../../App";
const WorkerForm = () => {
    const { user } = useContext(UserContext);
    let { id } = useParams();
    document.title = id ? "Manager - Edit Worker" : "Manager - New Worker";
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        isAdmin: false,
        isSuper: false,
    });
    const [permission, setPermission] = useState("User");
    const [password, setPassword] = useState({
        password: "",
        confirmPassword: ""
    });
    const [msg, setMessage] = useState("");
    const [available, setAvailable] = useState(false);

    const dispatch = useDispatch();

    const handleInfoChange = ({ currentTarget: input }) => {
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
        ) {
            if (id) {
                return true;
            } else {
                return checkPassword();
            }
        }
        return false;
    }

    useEffect(() => {
        if (id) {
            dispatch(findWorker(id)).then(({ payload: { worker: worker } }) => {
                setData({
                    name: worker.name,
                    email: worker.email,
                    phoneNumber: worker.phoneNumber,
                    isAdmin: worker.isAdmin,
                    isSuper: worker.isSuper
                })
                if (worker.isSuper)
                    setPermission("Super");
                else if (worker.isAdmin)
                    setPermission("Admin");
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])
    const { message, error, loading } = useSelector((state) => state.workers);
    const updateUserInfo = event => {
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

    const isRadioChecked = (value) => {
        return value === permission;
    }
    const handlePermissionChange = event => {
        const { value } = event.target;
        setPermission(value);
    };
    const handlePasswordChange = ({ currentTarget: input }) => {
        setPassword({ ...password, [input.name]: input.value });
    };
    const updateUserPermissions = event => {
        event.preventDefault();
        dispatch(setUserPermissions({
            id,
            permission,
        }));
    }
    const updateUserPassword = event => {
        event.preventDefault();
        if (password.password !== password.confirmPassword)
            return setMessage("Passwords are not the same!");
        else {
            dispatch(setUserPassword({
                id,
                password: password.password,
            }))
        }
    }
    return (
        <>
            {loading && <Loading />}
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <h1 className="opacity">{id && data ? `Edit - ${data.name}` : "New Worker"}</h1>
                        {message && <div id="msg">{message}</div>}
                        {msg && <div id="msg">{msg}</div>}
                        {/* {error && <div id="msg">{error}</div>} */}
                        <form onSubmit={updateUserInfo} autoComplete="off">
                            <input onChange={handleInfoChange} name="name" type="text" placeholder="Full Name" value={data.name} />
                            {!id && <>
                                <input onChange={handleInfoChange} name="username" type="text" placeholder="Username" onBlur={checkUsername} />
                                <input onChange={handleInfoChange} name="password" type="password" placeholder="Password" />
                                <input onChange={handleInfoChange} name="confirmPassword" type="password" placeholder="Confirm Password" onBlur={checkPassword} />
                            </>}
                            <input onChange={handleInfoChange} name="email" type="text" placeholder="E-Mail" value={data.email} />
                            <input onChange={handleInfoChange} name="phoneNumber" type="text" placeholder="Phone Number" value={data.phoneNumber} />
                            <button type="submit" className="opacity">{id ? "Edit" : "Add"}</button>
                        </form>
                    </div>
                    <div className="circle circle-two"></div>
                </div>
                <div className="theme-btn-container"></div>
                {id &&
                    user?.isSuper &&
                    <>
                        <form onSubmit={updateUserPermissions}>
                            <input type="radio" name="permissions" value="Super" onChange={handlePermissionChange} checked={isRadioChecked("Super")} /> Super
                            <input type="radio" name="permissions" value="Admin" onChange={handlePermissionChange} checked={isRadioChecked("Admin")} /> Admin
                            <input type="radio" name="permissions" value="User" onChange={handlePermissionChange} checked={isRadioChecked("User")} /> User
                            <button type="submit">Update Permissions</button>
                        </form>
                        <form onSubmit={updateUserPassword}>
                            <input type="password" name="password" onChange={handlePasswordChange} />
                            <input type="password" name="confirmPassword" onChange={handlePasswordChange} />
                            <button type="submit">Update Password</button>
                        </form>
                    </>
                }

            </section>
        </>
    )
}

export default WorkerForm;
