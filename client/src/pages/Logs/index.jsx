import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./row";
function Logs() {

    const [logs, setLogs] = useState(null);
    
    useEffect(() => {
        const getLogs = async () => {
            try {
                const res = await axios.get("api/logs");
                setLogs(res.data.logs);
            }
            catch (err) {
                console.log(err)
            }
        }
        getLogs();
    }, []);


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
                    {logs && logs.map(createRow)}
                </tbody>
            </table>
        </>
    );
}

export default Logs;