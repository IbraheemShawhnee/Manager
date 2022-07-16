import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { findBill } from "../../features/Bills/billsSlice";
function Bill() {
    document.title = "Manager - Bill";
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findBill(id));
    }, []);
    const bill = useSelector((state) => state.bills.bills);
    return (
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
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    bill &&
                    <tr>
                        <td>
                            {bill.date && bill.date.substring(0, 10)}
                        </td>
                        <td>
                            {bill.value}
                        </td>
                        <td>
                            {bill.description}
                        </td>
                        <td>
                            {bill.extraNotes}
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );

}



export default Bill;