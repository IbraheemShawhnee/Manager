import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { findWorker } from "../../features/Workers/workersSlice";
function Worker() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findWorker(id));
    }, [])
    const worker = useSelector((state) => state.workers.workers);
    if (worker) {
        document.title = `Worker - ${worker.name}`;
    } else {
        document.title = "Manager - 404";
    }
    return (
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
    );

}



export default Worker;