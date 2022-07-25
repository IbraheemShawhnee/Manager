import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs, fetchMyLogs } from "../../features/Logs/logsSlice";

import { UserContext } from "../../App";
import Row from "./row";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
function Logs() {
    document.title = "Manager - Logs"
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user && (user.isAdmin || user.isSuper)) {
            dispatch(fetchLogs());
        }
        else {
            dispatch(fetchMyLogs());
        }
    }, [])
    const response = useSelector((state) => state.logs);
    function createRow(log) {
        return (<Row
            key={log._id}
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
            <Link to="../logs/new"><h1>Logs Page</h1></Link>
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            {!response.loading && response.logs.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Worker Name
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
                        {response.logs.map(createRow)}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}

export default Logs;