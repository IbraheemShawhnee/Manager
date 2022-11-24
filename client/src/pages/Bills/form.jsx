import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { fetchBills } from "../../features/Bills/billsSlice";
import { findBill, createBill, updateBill } from "../../features/Bills/billsSlice";
const BillForm = () => {
    let { id } = useParams();
    document.title = id ? "Manager - Edit Bill" : "Manager - New Bill";
    const date = new Date();
    const [data, setData] = useState({
        date: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
        value: 0,
        description: "",
        extraNotes: "",
    });
    const dispatch = useDispatch();
    const [msg, setMessage] = useState("");
    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    useEffect(() => {
        dispatch(fetchBills());
        if (id) {
            dispatch(findBill(id)).then(({ payload: bill }) => {
                setData({
                    date: bill.date.substring(0, 10),
                    value: bill.value,
                    description: bill.description,
                    extraNotes: bill.extraNotes
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])
    const { loading } = useSelector((state) => state.bills);
    const { message } = useSelector(state => state.bills);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(updateBill({
                id,
                data
            }))
        } else {
            dispatch(createBill(data))
        }
    };
    return (
        <>
            {loading && <Loading />}
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <h1 className="opacity">{id && data ? `Edit - Bill` : "New Bill"}</h1>
                        {message && <div id="msg">{message}</div>}
                        {msg && <div id="msg">{msg}</div>}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input type="date" name="date" value={data.date} onChange={handleInfoChange} />
                            <input type="text" name="value" placeholder="VALUE" value={data.value} onChange={handleInfoChange} />
                            <input type="text" name="description" placeholder="DESCRIPTION" value={data.description} onChange={handleInfoChange} />
                            <input type="string" name="extraNotes" placeholder="EXTRA NOTES" value={data.extraNotes} onChange={handleInfoChange} />
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

export default BillForm;
