import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Log() {
    let params = useParams();
    const [log, setLog] = useState(null);
    useEffect(() => {
        const getLog = async () => {
            try {
                const url = `api/logs/${params.id}`;
                const res = await axios.get(url, { baseURL: "/" });
                setLog(res.data.log);
            }
            catch (err) {
                console.log(err)
            }
        }
        getLog();
    }, []);
    return (
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
                        Payment
                    </th>
                    <th>
                        Time
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    log &&
                    <tr>
                        <td>
                            {log.date.substring(0, 10)}
                        </td>
                        <td>
                            {log.worker.name}
                        </td>
                        <td>
                            {log.time}
                        </td>
                        {/* <td>
                            {log.extraNotes}
                        </td> */}
                    </tr>
                }
            </tbody>
        </table>
    );

}



export default Log;