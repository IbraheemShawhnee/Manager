import React from "react";

function Row(props) {
    const link = `cheques/${props.id}`
    return (
        <tr>
            <td>
                {props.date}
            </td>
            <td>
                {props.serial}
            </td>
            <td>
                {props.name}
            </td>
            <td>
                {props.value}
            </td>
            <td>
            <a href={link}> View</a>
            </td>
        </tr>
    );
}

export default Row;