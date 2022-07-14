import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Bill() {
    document.title = "Manager - Bill";
    let params = useParams();
    const [bill, setBill] = useState(null);
    useEffect(() => {
        const getBill = async () => {
            try {
                const url = `api/bills/${params.id}`;
                const res = await axios.get(url, { baseURL: "/" });
                setBill(res.data.bill);
            }
            catch (err) {
                console.log(err)
            }
        }
        getBill();
    }, []);
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
                            {bill.date.substring(0, 10)}
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