import React from "react";
import { Link } from "react-router-dom";
function Row(props) {
    const link = `../logs/${props.id}`
    return (
        <tr>
            <td>
                {props.date}
            </td>
            {!props.noUser &&
                <td>
                    {props.name}
                </td>
            }
            <td>
                {props.isAbsence ? "true" : "false"}
            </td>
            <td>
                {props.overtime}
            </td>
            <td>
                {props.overtimeValue}
            </td>
            <td>
                {props.time}
            </td>
            <td>
                {props.payment}
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