import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./row";
function Cheques() {
    document.title = "Manager - Cheques";
    const [cheques, setCheques] = useState(null);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const getCheques = async () => {
            try {
                const res = await axios.get("api/cheques");
                setCheques(res.data.cheques);
                setTotal(res.data.sum);
            }
            catch (err) {
                console.cheque(err)
            }
        }
        getCheques();
    }, []);


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
                            Total: ₪{total}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cheques && cheques.map(createRow)}
                </tbody>
            </table>
        </>
    );
}

export default Cheques;