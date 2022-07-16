import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "../Cheques/row"

function Payee() {
    let params = useParams();
    const [payee, setPayee] = useState(null);
    const [cheques, setCheques] = useState(null);
    const [total, setTotal] = useState(null);
    useEffect(() => {
        const getPayee = async () => {
            try {
                const url = `api/payees/${params.id}`;
                const res = await axios.get(url, { baseURL: "/" });
                setPayee(res.data.payee);
                setCheques(res.data.cheques);
                setTotal(res.data.sum);
            }
            catch (err) {
                console.log(err)
            }
        }
        getPayee();
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
    if (payee) {
        document.title = `Payee - ${payee.name}`;
    } else {
        document.title = "Manager - 404";
    }
    return (
        <>
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
                            Extra Notes
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payee &&
                        <tr>
                            <td>
                                {payee.name}
                            </td>
                            <td>
                                {payee.email}
                            </td>
                            <td>
                                {payee.phoneNumber}
                            </td>
                            <td>
                                {payee.extraNotes}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {cheques && cheques.length != 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Serial Number
                            </th>
                            <th></th>
                            <th>
                                Value
                            </th>
                            <th>
                                {total && <span>Total: ₪{total}</span>}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cheques.map(createRow)
                        }
                    </tbody>
                </table>
            }
        </>
    );

}



export default Payee;