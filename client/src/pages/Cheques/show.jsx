import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findCheque } from "../../features/Cheques/chequesSlice";
import Loading from "../../components/Loading";
function Cheque() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findCheque(id));
    }, []);

    const { cheques: cheque, loading } = useSelector((state) => state.cheques);
    console.log(useSelector((state) => state.cheques));
    if (cheque) {
        document.title = `Cheque - #${cheque.serial}`;
    }
    else {
        document.title = "Manager - 404";
    }
    return (
        <>
            {loading && <Loading />}
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
                                {cheque.payee && cheque.payee.name}
                            </td>
                            <td>
                                {cheque.dueDate && cheque.dueDate.substring(0, 10)}
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
        </>
    );

}



export default Cheque;