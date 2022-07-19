import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./row";
import { Link } from "react-router-dom";
import { fetchCheques } from "../../features/Cheques/chequesSlice";
import Loading from "../../components/Loading";
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
            description={cheque.description}
        />
        );
    }
    return (
        <>
        <Link to="../cheques/new"><h1>Cheques Page</h1></Link>
            {response.loading && <Loading />}
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
                                Description
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