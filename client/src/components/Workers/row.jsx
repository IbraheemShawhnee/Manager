import React from "react";

function Row(props) {
    const link = `workers/${props.id}`
    return (
        <tr>
            <td>
                {props.username}
            </td>
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
            <a href={link}> View</a>
            </td>
        </tr>
    );
}

export default Row;