import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "./row";

import { fetchBills } from "../../features/Bills/billsSlice";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

function Bills() {
    document.title = "Manager - Bills";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBills());
    }, [])
    const response = useSelector((state) => state.bills);
    function createRow(bill) {
        return (<Row
            key={bill._id}
            id={bill._id}
            date={bill.date.substring(0, 10)}
            value={bill.value}
            description={bill.description}
            extraNotes={bill.extraNotes}
        />
        );
    }
    return (
        <>
            <Link to="../bills/new"><h1>Bills Page</h1></Link>
            {response.loading && <Loading />}
            {!response.loading && response.error ? <div>Error: {response.error}</div> : null}
            {!response.loading && response.bills.bills && response.bills.bills.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Value
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Extra Notes
                            </th>
                            <th>
                                Total: ₪{response.bills.sum}
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.bills.bills.map(createRow)}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}

export default Bills;