import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { fetchPayees } from "../../features/Payees/payeesSlice";
import { createCheque, findCheque, updateCheque } from "../../features/Cheques/chequesSlice";
const ChequeForm = () => {
    let { id } = useParams();
    document.title = id ? "Manager - Edit Cheque" : "Manager - New Cheque";
    const date = new Date();
    const [data, setData] = useState({
        dueDate: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + 30,
        payee: "",
        serial: "",
        isCancelled: false,
        value: 0,
        description: ""
    });
    const dispatch = useDispatch();
    const [msg, setMessage] = useState("")
    useEffect(() => {
        dispatch(fetchPayees());
        if (id) {
            dispatch(findCheque(id)).then(({ payload: cheque }) => {
                setData({
                    dueDate: cheque.dueDate.substring(0, 10),
                    payee: cheque.payee._id,
                    serial: cheque.serial,
                    isCancelled: cheque.isCancelled,
                    value: cheque.value,
                    description: cheque.description
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])
    const { loading, payees } = useSelector((state) => state.payees);
    const { message } = useSelector(state => state.cheques)
    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        if (id) {
            dispatch(updateCheque({
                id,
                data
            }))
        } else {
            dispatch(createCheque(data))
        }
    };
    const toggleCancelled = () => {
        data.isCancelled = !data.isCancelled;
        if (data.isCancelled) {
            document.getElementById("payee").value = data.payee = "";
        }
    }
    function createOptions(payee) {
        return (<option
            key={payee._id}
            value={payee._id}
        >
            {payee.name}
        </option>
        );
    }
    return (
        <>
            {loading && <Loading />}
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <h1 className="opacity">{id && data ? `Edit - Cheque` : "New Cheque"}</h1>
                        {message && <div id="msg">{message}</div>}
                        {msg && <div id="msg">{msg}</div>}
                        {/* {error && <div id="msg">{error}</div>} */}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input type="date" name="dueDate" value={data.dueDate} onChange={handleInfoChange} />
                            {!id &&
                                <select name="payee" id="payee" onChange={handleInfoChange} required value={data.payee}>
                                    <option disabled hidden value="">Choose...</option>
                                    {
                                        payees.map(createOptions)
                                    }
                                </select>
                            }
                            <input type="text" name="serial" value={data.serial} onChange={handleInfoChange} required />
                            <input type="text" name="value" value={data.value} onChange={handleInfoChange} />
                            <input type="text" name="description" value={data.description} onChange={handleInfoChange} />
                            <input type="checkbox" name="isCancelled" defaultChecked={data.isCancelled} onClick={toggleCancelled} />
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

export default ChequeForm;