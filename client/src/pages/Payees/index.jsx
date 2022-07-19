import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./row";

import { Link } from "react-router-dom";
import { fetchPayees } from "../../features/Payees/payeesSlice";
import Loading from "../../components/Loading";
function Payees() {
    document.title = "Manager - Payees";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPayees());
    }, [])
    const response = useSelector((state) => state.payees);

    function createRow(payee) {
        return (<Row
            key={payee._id}
            id={payee._id}
            name={payee.name}
            email={payee.email}
            phoneNumber={payee.phoneNumber}
            extraNotes={payee.extraNotes}
        />
        );
    }

    return (
        <>
            <Link to="../payees/new"><h1>Payees Page</h1></Link>
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            {!response.loading && response.payees.length ? (
                <table>
                    <thead>
                        <tr>
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
                                Etxra Notes
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.payees && response.payees.map(createRow)}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}

export default Payees;