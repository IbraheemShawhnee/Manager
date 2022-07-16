import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Row from "../Cheques/row"
import { findPayee } from "../../features/Payees/payeesSlice";
import Loading from "../../components/Loading";

function Payee() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findPayee(id));
    }, []);
    const { payees, loading } = useSelector((state) => state.payees)
    const { payee, cheques, sum: total } = payees;
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
    if (payee) {
        document.title = `Payee - ${payee.name}`;
    } else {
        document.title = "Manager - 404";
    }
    return (
        <>
            {loading && <Loading />}
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
                                    Description
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