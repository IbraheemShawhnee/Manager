import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./row";

import { fetchCheques } from "../../features/Cheques/chequesSlice";
function Cheques() {
    document.title = "Manager - Cheques";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCheques());
    }, [])
    const response = useSelector((state) => state.cheques);

    function createRow(cheque) {
        return (<Row
            key={cheque._id}
            id={cheque._id}
            date={cheque.dueDate.substring(0, 10)}
            serial={cheque.serial}
            name={cheque.payee.name}
            value={cheque.value}
        />
        );
    }
    return (
        <>
            <h1>Cheques Page</h1>
            {response.loading && <div>Loading...</div>}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            {!response.loading && response.cheques.cheques && response.cheques.cheques.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Serial Number
                            </th>
                            <th>
                                Payee Name
                            </th>
                            <th>
                                Value
                            </th>
                            <th>
                            Total: ₪{response.cheques.sum}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {response.cheques.cheques.map(createRow)}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}

export default Cheques;