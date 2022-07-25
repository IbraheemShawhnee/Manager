import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createPayee, findPayee, updatePayee } from "../../features/Payees/payeesSlice";
import Loading from "../../components/Loading";
const PayeeForm = () => {
    let { id } = useParams();
    document.title = id ? "Edit Payee" : "New Payee";
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        extraNotes: "",
    });
    // const [message, setMessage] = useState("");
    // const [error, setError] = useState(false);


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    useEffect(() => {
        if (id) {
            dispatch(findPayee(id)).then(({ payload: { payee } }) => {
                setData({
                    name: payee.name,
                    email: payee.email,
                    phoneNumber: payee.phoneNumber,
                    extraNotes: payee.extraNotes
                })
            }).catch((error) => {
                // setMessage("Something went wrong!");
                // setError(true);
                return console.log(error);
            })
        }
    }, [])
    const { message, error, loading } = useSelector((state) => state.payees);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(updatePayee({ id, data }));
        } else {
            dispatch(createPayee(data))
        }
    };

    return (
        <>
            {loading && <Loading />}
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <h1 className="opacity">{id && data ? `Edit - ${data.name}` : "New Payee"}</h1>
                        <form onSubmit={handleSubmit} autoComplete="off" >
                            {message && <div>{message}</div>}
                            {error && <div>{error}</div>}
                            <input onChange={handleChange} name="name" type="text" placeholder="Name" value={data.name} required />
                            <input onChange={handleChange} name="email" type="text" placeholder="E-Mail" value={data.email} />
                            <input onChange={handleChange} name="phoneNumber" type="text" placeholder="Phone Number" value={data.phoneNumber} />
                            <input onChange={handleChange} name="extraNotes" type="string" placeholder="Extra Notes" value={data.extraNotes} />
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

export default PayeeForm;
