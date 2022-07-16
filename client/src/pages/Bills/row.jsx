import React from "react";
import { Link } from "react-router-dom";
function Row(props) {
    const link = `../bills/${props.id}`
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
                <Link to={link}> View</Link>
            </td>
        </tr>
    );
}

export default Row;