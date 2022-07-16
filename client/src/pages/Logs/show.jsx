import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { findLog } from "../../features/Logs/logsSlice";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
function Log() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findLog(id));
    }, []);

    const { logs: log, loading } = useSelector((state) => state.logs);
    if (log) {
        console.log(log);
        document.title = `Log - ${log.worker?.name}`;
    } else {
        document.title = "Manager - 404";
    }
    return (
        <>
            {loading && <Loading />}
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
                    </tr>
                </thead>
                <tbody>
                    {
                        log && log.length != 0 &&
                        <tr>
                            <td>
                                {log.date?.substring(0, 10)}
                            </td>
                            <td>
                                {log.worker?.name}
                            </td>
                            <td>
                                {log.isAbsence ? "true" : "false"}
                            </td>
                            <td>
                                {log.overtime}
                            </td>
                            <td>
                                {log.overtimeValue}
                            </td>
                            <td>
                                {log.time}
                            </td>
                            <td>
                                {log.payment}
                            </td>
                            <td>
                                {log.extraNotes}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );

}



export default Log;