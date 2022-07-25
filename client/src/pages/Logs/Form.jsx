import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { fetchWorkers } from "../../features/Workers/workersSlice";
import { findLog, createLog, updateLog } from "../../features/Logs/logsSlice";
const LogForm = () => {
    let { id } = useParams();
    document.title = id ? "Manager - Edit Log" : "Manager - New Log";
    const date = new Date();
    const [data, setData] = useState({
        date: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
        worker: "",
        payment: 0,
        isAbsence: false,
        startingTime: "08:30",
        finishingTime: "16:30",
        OTV: "",
        extraNotes: ""
    });
    const dispatch = useDispatch();
    const [msg, setMessage] = useState("")
    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    useEffect(() => {
        dispatch(fetchWorkers());
        if (id) {
            dispatch(findLog(id)).then(({ payload: log }) => {
                setData({
                    date: log.date.substring(0, 10),
                    worker: log.worker._id,
                    payment: log.payment,
                    isAbsence: log.isAbsence,
                    startingTime: log.startingTime,
                    finishingTime: log.finishingTime,
                    extraNotes: log.extraNotes
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])
    const { loading, workers } = useSelector((state) => state.workers);
    const { message } = useSelector(state => state.logs)
    const handleSubmit = (event) => {
        event.preventDefault();
        let end = data.finishingTime.split(':');
        let start = data.startingTime.split(':');
        let x = parseInt(end[0]) - parseInt(start[0]);
        let y = (parseInt(end[1]) - parseInt(start[1])) / 60;
        data.OTV = x + y - 8;
        if (id) {
            dispatch(updateLog({
                id,
                data
            }))
        } else {
            dispatch(createLog(data))
        }
    };
    const toggleAbsence = () => {
        data.isAbsence = !data.isAbsence;
        console.log(data.isAbsence)
    }
    function createOptions(worker) {
        return (<option
            key={worker._id}
            value={worker._id}
        >
            {worker.name}
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
                        <h1 className="opacity">{id && data ? `Edit - Log` : "New Log"}</h1>
                        {message && <div id="msg">{message}</div>}
                        {msg && <div id="msg">{msg}</div>}
                        {/* {error && <div id="msg">{error}</div>} */}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <input type="date" name="date" value={data.date} onChange={handleInfoChange} />
                            {!id &&
                                <select name="worker" onChange={handleInfoChange} required value={data.worker}>
                                    <option disabled hidden value="">Choose...</option>
                                    {
                                        workers.map(createOptions)
                                    }
                                </select>
                            }
                            <input type="text" name="payment" value={data.payment} onChange={handleInfoChange} />
                            <input type="checkbox" name="isAbsence" defaultChecked={data.isAbsence} onClick={toggleAbsence} />

                            <input type="time" name="startingTime" onChange={handleInfoChange} value={data.startingTime} />
                            <input type="time" name="finishingTime" onChange={handleInfoChange} value={data.finishingTime} />
                            <input type="text" name="extraNotes" />
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

export default LogForm;