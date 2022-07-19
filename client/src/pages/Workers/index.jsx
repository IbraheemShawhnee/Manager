import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./row";

import { fetchWorkers } from "../../features/Workers/workersSlice";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
function Workers() {
    document.title = "Manager - Workers";
    const dispatch = useDispatch();
    const response = useSelector((state) => state.workers);
    useEffect(() => {
        dispatch(fetchWorkers());
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
            <Link to="../workers/new"><h1>Workers Page</h1></Link>
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            {!response.loading && response.workers.length ? (
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
                        {response.workers.map(createRow)}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}

export default Workers;