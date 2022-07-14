import React from "react";

function Row(props) {
    const link = `bills/${props.id}`
    return (
        <tr>
            <td>
                {props.date}
            </td>
            <td>
                {props.value}
            </td>
            <td>
                {props.description}
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