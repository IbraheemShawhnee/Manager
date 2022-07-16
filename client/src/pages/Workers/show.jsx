import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { findWorker } from "../../features/Workers/workersSlice";
import Loading from "../../components/Loading";

import Row from "../Logs/row";
function Worker() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findWorker(id));
    }, [])
    const { workers, loading } = useSelector((state) => state.workers);
    const { worker, logs } = workers;
    if (worker) {
        document.title = `Worker - ${worker.name}`;
    } else {
        document.title = "Manager - 404";
    }
    function createRow(log) {
        return (<Row
            key={log._id}
            noUser={true}
            id={log._id}
            date={log.date.substring(0, 10)}
            name={log.worker.name}
            isAbsence={log.isAbsence}
            overtimeValue={log.overtimeValue}
            time={log.time}
            payment={log.payment}
            extraNotes={log.extraNotes}
        />
        );
    }
    return (
        <>
            {loading ? <Loading /> :
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Username
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Phone Number
                                </th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                worker &&
                                <tr>
                                    <td>
                                        {worker.username}
                                    </td>
                                    <td>
                                        {worker.name}
                                    </td>
                                    <td>
                                        {worker.email}
                                    </td>
                                    <td>
                                        {worker.phoneNumber}
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    {logs && logs.length != 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Date
                                    </th>
                                    <th>
                                        Absence
                                    </th>
                                    <th>
                                        Overtime
                                    </th>
                                    <th>
                                        Overtime Value
                                    </th>
                                    <th>
                                        Time
                                    </th>
                                    <th>
                                        Payment
                                    </th>
                                    <th>
                                        Extra Notes
                                    </th>
                                    <th>
                                        SHOW/EDIT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(createRow)}
                            </tbody>
                        </table>
                    }
                </>
            }
        </>
    );

}



export default Worker;