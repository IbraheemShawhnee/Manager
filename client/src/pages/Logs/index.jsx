import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs, fetchMyLogs } from "../../features/Logs/logsSlice";

import { UserContext } from "../../App";
import Row from "./row";

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
        // description={log.description}
        // extraNotes={log.extraNotes}
        />
        );
    }

    return (
        <>
            <h1>Logs Page</h1>
            {response.loading && <div>Loading...</div>}
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
                        {/* <th>
                            Description
                        </th>
                        <th>
                            Extra Notes
                        </th>
                        <th>
                        </th>
                        <th> 
                        </th> */}
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