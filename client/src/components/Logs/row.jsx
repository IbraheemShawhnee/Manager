import React from "react";

function Row(props) {
    const link = `logs/${props.id}`
    return (
        <tr>
            <td>
                {props.date}
            </td>
            <td>
                {props.name}
            </td>
            {/* <td>
                {props.description}
            </td>
            <td>
                {props.extraNotes}
            </td> */}
            <td>
            <a href={link}> View</a>
            </td>
        </tr>
    );
}

export default Row;