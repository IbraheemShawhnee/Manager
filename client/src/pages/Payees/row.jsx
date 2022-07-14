import React from "react";

function Row(props) {
    const link = `payees/${props.id}`
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
            <a href={link}> View</a>
            </td>
        </tr>
    );
}

export default Row;