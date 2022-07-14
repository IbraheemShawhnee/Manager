import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./row";
function Bills() {
    document.title = "Manager - Bills";
    const [bills, setBills] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getBills = async () => {
            try {
                const res = await axios.get("api/bills");
                setBills(res.data.bills);
                setTotal(res.data.sum);
            }
            catch (err) {
                console.log(err)
            }
        }
        getBills();
    }, []);


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
            <h1>Bills Page</h1>
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
                            Total: {total}
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {bills && bills.map(createRow)}
                </tbody>
            </table>
        </>
    );
}

export default Bills;