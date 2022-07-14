import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Worker() {
    let params = useParams();
    const [worker, setWorker] = useState(null);
    useEffect(() => {
        const getWorker = async () => {
            try {
                const url = `api/workers/${params.id}`;
                const res = await axios.get(url, { baseURL: "/" });
                setWorker(res.data.worker);
            }
            catch (err) {
                console.log(err)
            }
        }
        getWorker();
    }, []);
    if (worker){
        document.title = `Worker - ${worker.name}`;
    }else{
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