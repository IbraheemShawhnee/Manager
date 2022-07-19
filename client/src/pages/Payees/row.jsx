import React from "react";
import { Link } from "react-router-dom";
function Row(props) {
    const link = `../payees/${props.id}`
    return (
        <tr>
            <td>
                {props.name}
            </td>
            <td>
                {props.email}
            </td>
            <td>
                {props.phoneNumber}
            </td>
            <td>
                {props.extraNotes}
            </td>
            <td>
            <Link to={link}> View</Link>
            </td>
        </tr>
    );
}

export default Row;