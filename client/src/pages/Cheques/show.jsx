import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Cheque() {
    let params = useParams();
    const [cheque, setCheque] = useState(null);
    useEffect(() => {
        const getCheque = async () => {
            try {
                const url = `api/cheques/${params.id}`;
                const res = await axios.get(url, { baseURL: "/" });
                setCheque(res.data.cheque);
            }
            catch (err) {
                console.cheque(err)
            }
        }
        getCheque();
    }, []);
    console.log(cheque);
    if (cheque) {
        document.title = `Cheque - #${cheque.serial}`;
    }
    else{
        document.title = "Manager - 404";
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Payee Name
                    </th>
                    <th>
                        Cheque Due Date
                    </th>
                    <th>
                        Cheque Value
                    </th>
                    <th>
                        Cheque Description
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    cheque &&
                    <tr>
                        <td>
                            {cheque.payee.name}
                        </td>
                        <td>
                            {cheque.dueDate.substring(0, 10)}
                        </td>
                        <td>
                            {cheque.value}
                        </td>
                        <td>
                            {cheque.description}
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );

}



export default Cheque;