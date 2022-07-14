import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./row";

function Payees() {
    document.title = "Manager - Payees";
    const [payees, setPayees] = useState(null);
    
    useEffect(() => {
        const getPayees = async () => {
            try {
                const res = await axios.get("api/payees");
                setPayees(res.data.payees);
            }
            catch (err) {
                console.log(err)
            }
        }
        getPayees();
    }, []);

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
            <h1>Payees Page</h1>
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
                    {payees && payees.map(createRow)}
                </tbody>
            </table>
        </>
    );
}

export default Payees;