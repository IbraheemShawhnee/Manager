import React from "react";
import { Link } from "react-router-dom";
function Row(props) {
    const link = `../workers/${props.id}`
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
                <Link to={link}> View</Link>
            </td>
        </tr>
    );
}

export default Row;