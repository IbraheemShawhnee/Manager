import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./row";

function Workers() {
    document.title = "Manager - Workers";
    const [workers, setWorkers] = useState(null);

    useEffect(() => {
        const getWorkers = async () => {
            try {
                const res = await axios.get("api/workers");
                setWorkers(res.data.workers);
            }
            catch (err) {
                console.log(err)
            }
        }
        getWorkers();
    }, []);

    function createRow(worker) {
        return (<Row
            key={worker._id}
            id={worker._id}
            username={worker.username}
            name={worker.name}
            email={worker.email}
            phoneNumber={worker.phoneNumber}
        />
        );
    }

    return (
        <>
            <h1>Workers Page</h1>
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
                    {workers && workers.map(createRow)}
                </tbody>
            </table>
        </>
    );
}

export default Workers;